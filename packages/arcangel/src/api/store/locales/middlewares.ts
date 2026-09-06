import { MiddlewareRoute } from "@arcangel/framework/http"

export const storeLocalesRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/store/locales",
    middlewares: [],
  },
]
