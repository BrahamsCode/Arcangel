import { logger } from "@arcangel/framework/logger"
import {
  ExternalModuleDeclaration,
  InternalModuleDeclaration,
} from "@arcangel/framework/types"
import {
  ContainerRegistrationKeys,
  createPgConnection,
  promiseAll,
} from "@arcangel/framework/utils"

export interface InitModulesOptions {
  injectedDependencies?: Record<string, unknown>
  databaseConfig: {
    clientUrl: string
    schema?: string
  }
  modulesConfig: {
    [key: string]:
      | string
      | boolean
      | Partial<InternalModuleDeclaration | ExternalModuleDeclaration>
  }
  preventConnectionDestroyWarning?: boolean
  cwd?: string
}

export async function initModules({
  injectedDependencies,
  databaseConfig,
  modulesConfig,
  preventConnectionDestroyWarning = false,
  cwd,
}: InitModulesOptions) {
  const moduleSdkImports = require("@arcangel/framework/modules-sdk")

  injectedDependencies ??= {}

  let sharedPgConnection =
    injectedDependencies?.[ContainerRegistrationKeys.PG_CONNECTION]

  let shouldDestroyConnectionAutomatically = !sharedPgConnection
  if (!sharedPgConnection) {
    sharedPgConnection = createPgConnection({
      clientUrl: databaseConfig.clientUrl,
      schema: databaseConfig.schema,
    })

    injectedDependencies[ContainerRegistrationKeys.PG_CONNECTION] =
      sharedPgConnection
  }

  const arcangelApp = await moduleSdkImports.ArcangelApp({
    modulesConfig,
    injectedDependencies,
    cwd,
  })

  await arcangelApp.onApplicationStart()

  async function shutdown() {
    const promises: Promise<void>[] = []

    if (shouldDestroyConnectionAutomatically) {
      promises.push((sharedPgConnection as any).context?.destroy())
      promises.push((sharedPgConnection as any).destroy())
      promises.push(arcangelApp.onApplicationPrepareShutdown())
      promises.push(arcangelApp.onApplicationShutdown())
    } else {
      if (!preventConnectionDestroyWarning) {
        logger.info(
          `You are using a custom shared connection. The connection won't be destroyed automatically.`
        )
      }
    }

    await promiseAll(promises)
    moduleSdkImports.ArcangelModule.clearInstances()
  }

  return {
    arcangelApp,
    shutdown,
  }
}
