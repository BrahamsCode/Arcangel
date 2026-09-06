import { raw } from "express"
import { z } from "../../../deps/zod"
import { ArcangelNextFunction, ArcangelRequest, ArcangelResponse } from "../../types"
import { defineMiddlewares } from "../../utils/define-middlewares"
import {
  adminRegexMiddlewareMock,
  customersCreateMiddlewareMock,
  customersCreateMiddlewareValidatorMock,
  customersGlobalMiddlewareMock,
  storeGlobalMiddlewareMock,
} from "../mocks"

const customersGlobalMiddleware = (
  req: ArcangelRequest,
  res: ArcangelResponse,
  next: ArcangelNextFunction
) => {
  customersGlobalMiddlewareMock()
  next()
}

const customersCreateMiddleware = (
  req: ArcangelRequest,
  res: ArcangelResponse,
  next: ArcangelNextFunction
) => {
  if (req.additionalDataValidator) {
    customersCreateMiddlewareValidatorMock()
  }
  customersCreateMiddlewareMock()
  next()
}

const storeGlobal = (
  req: ArcangelRequest,
  res: ArcangelResponse,
  next: ArcangelNextFunction
) => {
  storeGlobalMiddlewareMock()
  next()
}

const adminRegexMiddleware = (
  req: ArcangelRequest,
  res: ArcangelResponse,
  next: ArcangelNextFunction
) => {
  adminRegexMiddlewareMock()
  next()
}

const middlewares = defineMiddlewares([
  {
    matcher: "/customers",
    middlewares: [customersGlobalMiddleware],
  },
  {
    method: ["ALL"],
    matcher: "/v1*",
    bodyParser: {
      sizeLimit: "500kb",
    },
    middlewares: [],
  },
  {
    method: "POST",
    matcher: "/customers",
    additionalDataValidator: {
      group_id: z.string(),
    },
    middlewares: [customersCreateMiddleware],
  },
  {
    matcher: "/store/*",
    middlewares: [storeGlobal],
  },
  {
    matcher: /^\/admin(\/.*)?$/,
    middlewares: [adminRegexMiddleware],
  },
  {
    matcher: "/webhooks",
    bodyParser: {
      preserveRawBody: true,
    },
  },
  {
    matcher: "/webhooks/*",
    method: "POST",
    bodyParser: false,
    middlewares: [raw({ type: "application/json" })],
  },
])

export default middlewares
