import { Context } from "@arcangel/types"
import { ArcangelContextType } from "./context-parameter"

export function InjectSharedContext(): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: any
  ): void {
    if (!target.ArcangelContextIndex_) {
      throw new Error(
        `To apply @InjectSharedContext you have to flag a parameter using @ArcangelContext`
      )
    }

    const originalMethod = descriptor.value
    const argIndex = target.ArcangelContextIndex_[propertyKey]

    descriptor.value = function (...args: any[]) {
      const context: Context = {
        ...(args[argIndex] ?? { __type: ArcangelContextType }),
      }
      args[argIndex] = context

      return originalMethod.apply(this, args)
    }
  }
}
