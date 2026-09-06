import {
  AuthenticatedArcangelRequest,
  ArcangelResponse,
} from "@arcangel/framework/http"
import { ContainerRegistrationKeys } from "@arcangel/framework/utils"

export const POST = async (
  req: AuthenticatedArcangelRequest,
  res: ArcangelResponse
) => {
  req.session.auth_context = req.auth_context

  res.status(200).json({ user: req.auth_context })
}

export const DELETE = async (
  req: AuthenticatedArcangelRequest,
  res: ArcangelResponse
) => {
  const { sessionOptions, cookieOptions } = req.scope
    .resolve(ContainerRegistrationKeys.CONFIG_MODULE)
    .projectConfig

  const cookieName = sessionOptions?.name ?? "connect.sid"

  try {
    await new Promise<void>((resolve, reject) => {
      req.session.destroy((err) => (err ? reject(err) : resolve()))
    })
  } finally {
    res.clearCookie(cookieName, cookieOptions)
  }

  res.json({ success: true })
}
