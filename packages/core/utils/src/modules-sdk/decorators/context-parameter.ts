export function ArcangelContext() {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    if (!Object.prototype.hasOwnProperty.call(target, "ArcangelContextIndex_")) {
      target.ArcangelContextIndex_ = { ...(target.ArcangelContextIndex_ ?? {}) }
    }

    target.ArcangelContextIndex_[propertyKey] = parameterIndex
  }
}

ArcangelContext.getIndex = function (
  target: any,
  propertyKey: string
): number | undefined {
  return target.ArcangelContextIndex_?.[propertyKey]
}

export const ArcangelContextType = "ArcangelContext"
