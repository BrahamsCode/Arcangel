import {
  defineMiddlewares,
  validateAndTransformBody,
} from "@arcangel/framework/http"
import { z } from "@arcangel/framework/zod"

const CustomPostSchema = z.object({
  foo: z.string(),
})

export default defineMiddlewares({
  routes: [
    {
      method: ["POST"],
      matcher: "/custom",
      middlewares: [validateAndTransformBody(CustomPostSchema)],
    },
  ],
})
