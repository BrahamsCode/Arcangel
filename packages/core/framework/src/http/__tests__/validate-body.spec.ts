import { ArcangelError } from "@arcangel/utils"
import { z, ZodNullable, ZodObject, ZodOptional } from "@arcangel/deps/zod"
import { ArcangelRequest, ArcangelResponse } from "../types"
import { validateAndTransformBody } from "../utils/validate-body"

const createLinkBody = () => {
  return z.object({
    add: z.array(z.string()).optional(),
    remove: z.array(z.string()).optional(),
  })
}

describe("validateAndTransformBody", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should pass additionalDataValidator to validator factory", async () => {
    let mockRequest = {
      query: {},
      body: {
        additional_data: {},
      },
    } as ArcangelRequest

    const mockResponse = {} as ArcangelResponse
    const nextFunction = jest.fn()

    mockRequest.additionalDataValidator = z
      .object({
        brand_id: z.number(),
      })
      .nullish()

    const validatorFactory = (
      schema?: ZodOptional<ZodNullable<ZodObject<any, any>>>
    ) => {
      return schema
        ? createLinkBody().extend({
            additional_data: schema,
          })
        : createLinkBody()
    }

    let middleware = validateAndTransformBody(validatorFactory)

    await middleware(mockRequest, mockResponse, nextFunction)
    expect(nextFunction.mock.calls[0]).toEqual([
      new ArcangelError(
        "invalid_data",
        `Invalid request: Field 'additional_data, brand_id' is required`
      ),
    ])
  })

  it("should allow additional_data to be undefined", async () => {
    let mockRequest = {
      query: {},
      body: {},
    } as ArcangelRequest

    const mockResponse = {} as ArcangelResponse
    const nextFunction = jest.fn()

    mockRequest.additionalDataValidator = z
      .object({
        brand_id: z.number(),
      })
      .nullish()

    const validatorFactory = (
      schema?: ZodOptional<ZodNullable<ZodObject<any, any>>>
    ) => {
      return schema
        ? createLinkBody().extend({
            additional_data: schema,
          })
        : createLinkBody()
    }

    let middleware = validateAndTransformBody(validatorFactory)

    await middleware(mockRequest, mockResponse, nextFunction)
    expect(nextFunction.mock.calls[0]).toEqual([])
  })

  it("should allow additional_data nested properties to be undefined", async () => {
    let mockRequest = {
      query: {},
      body: {
        additional_data: {},
      },
    } as ArcangelRequest

    const mockResponse = {} as ArcangelResponse
    const nextFunction = jest.fn()

    mockRequest.additionalDataValidator = z
      .object({
        brand_id: z.number().optional(),
      })
      .nullish()

    const validatorFactory = (
      schema?: ZodOptional<ZodNullable<ZodObject<any, any>>>
    ) => {
      return schema
        ? createLinkBody().extend({
            additional_data: schema,
          })
        : createLinkBody()
    }

    let middleware = validateAndTransformBody(validatorFactory)

    await middleware(mockRequest, mockResponse, nextFunction)
    expect(nextFunction.mock.calls[0]).toEqual([])
  })
})
