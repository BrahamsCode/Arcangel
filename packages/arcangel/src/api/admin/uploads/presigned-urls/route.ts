import { ulid } from "ulid"
import { MIMEType } from "util"
import type {
  ArcangelResponse,
  AuthenticatedArcangelRequest,
} from "@arcangel/framework/http"
import {
  Modules,
  ArcangelError,
  ArcangelErrorTypes,
} from "@arcangel/framework/utils"
import type { HttpTypes } from "@arcangel/framework/types"
import type { AdminUploadPreSignedUrlType } from "../validators"

export const POST = async (
  req: AuthenticatedArcangelRequest<AdminUploadPreSignedUrlType>,
  res: ArcangelResponse<HttpTypes.AdminUploadPreSignedUrlResponse>
) => {
  const fileProvider = req.scope.resolve(Modules.FILE)
  let type: MIMEType

  try {
    type = new MIMEType(req.validatedBody.mime_type)
  } catch {
    throw new ArcangelError(
      ArcangelErrorTypes.INVALID_DATA,
      `Invalid file type "${req.validatedBody.mime_type}"`,
      ArcangelErrorTypes.INVALID_DATA
    )
  }

  const extension = type.subtype
  const uniqueFilename = `${ulid()}.${extension}`

  const response = await fileProvider.getUploadFileUrls({
    filename: uniqueFilename,
    mimeType: req.validatedBody.mime_type,
    access: req.validatedBody.access ?? "private",
  })

  res.json({
    url: response.url,
    filename: response.key,
    mime_type: type.toString(),
    size: req.validatedBody.size,
    extension,
    originalname: req.validatedBody.originalname,
  })
}
