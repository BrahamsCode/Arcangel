import { ArcangelContainer } from "@arcangel/types"
import {
  asFunction,
  asValue,
  AwilixContainer,
  ClassOrFunctionReturning,
  createContainer,
  Resolver,
} from "@arcangel/deps/awilix"

function asArray(
  resolvers: (ClassOrFunctionReturning<unknown> | Resolver<unknown>)[]
): { resolve: (container: AwilixContainer) => unknown[] } {
  return {
    resolve: (container: AwilixContainer) =>
      resolvers.map((resolver) => container.build(resolver)),
  }
}

function registerAdd(
  this: ArcangelContainer,
  name: string,
  registration: typeof asFunction | typeof asValue
) {
  const storeKey = name + "_STORE"

  if (this.registrations[storeKey] === undefined) {
    this.register(storeKey, asValue([] as Resolver<unknown>[]))
  }
  const store = this.resolve(storeKey) as (
    | ClassOrFunctionReturning<unknown>
    | Resolver<unknown>
  )[]

  if (this.registrations[name] === undefined) {
    this.register(name, asArray(store))
  }
  store.unshift(registration)

  return this
}

export function createArcangelContainer(...args): ArcangelContainer {
  const container = createContainer.apply(null, args) as ArcangelContainer

  container.registerAdd = registerAdd.bind(container)

  const originalScope = container.createScope
  container.createScope = () => {
    const scoped = originalScope() as ArcangelContainer
    scoped.registerAdd = registerAdd.bind(scoped)

    return scoped
  }

  return container
}
