import { Request, Response } from "express"
import { ArcangelError } from "@arcangel/utils"

export const GET = async (req: Request, res: Response) => {
  throw new ArcangelError(ArcangelError.Types.NOT_ALLOWED, "Not allowed")
}
