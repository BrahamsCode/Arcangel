import { z } from "@arcangel/deps/zod"
import { NextFunction } from "express"
import { ArcangelRequest, ArcangelResponse } from "../types"
import { zodValidator } from "../../zod"

export function validateAndTransformBody(
  zodSchema:
    | z.ZodObject<any, any>
    | z.ZodType<any, any, any>
    | ((
        customSchema?: z.ZodOptional<z.ZodNullable<z.ZodObject<any, any>>>
      ) => z.ZodObject<any, any> | z.ZodType<any, any, any>)
): (
  req: ArcangelRequest,
  res: ArcangelResponse,
  next: NextFunction
) => Promise<void> {
  return async function validateBody(
    req: ArcangelRequest,
    _: ArcangelResponse,
    next: NextFunction
  ) {
    try {
      let schema: z.ZodObject<any, any> | z.ZodType<any, any, any>
      if (typeof zodSchema === "function") {
        schema = zodSchema(req.additionalDataValidator)
      } else {
        schema = zodSchema
      }

      req.validatedBody = await zodValidator(schema, req.body)
      next()
    } catch (e) {
      next(e)
    }
  }
}
