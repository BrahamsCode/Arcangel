import { ArcangelError } from "@arcangel/framework/utils"
import { Request, Response } from "express"

export function GET(req: Request, res: Response) {
  throw new ArcangelError(ArcangelError.Types.INVALID_DATA, "Failed")
}
