export function InjectIntoContext(
  properties: Record<string, unknown | Function>
): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: any
  ): void {
    if (!target.ArcangelContextIndex_) {
      throw new Error(
        `To apply @InjectIntoContext you have to flag a parameter using @ArcangelContext`
      )
    }

    const argIndex = target.ArcangelContextIndex_[propertyKey]
    const original = descriptor.value
    descriptor.value = async function (...args: any[]) {
      for (const key of Object.keys(properties)) {
        args[argIndex] = args[argIndex] ?? {}
        args[argIndex][key] =
          args[argIndex][key] ??
          (typeof properties[key] === "function"
            ? (properties[key] as Function).apply(this, args)
            : properties[key])
      }

      return await original.apply(this, args)
    }
  }
}
