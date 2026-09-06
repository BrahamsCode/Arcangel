import { ArcangelAppLoader, Migrator } from "@arcangel/framework"
import { LinkLoader } from "@arcangel/framework/links"
import {
  ContainerRegistrationKeys,
  getResolvedPlugins,
  ArcangelError,
  mergePluginModules,
} from "@arcangel/framework/utils"
import { Logger } from "@arcangel/framework/types"
import { join } from "path"
import { initializeContainer } from "../../loaders"
import { ensureDbExists } from "../utils"

const TERMINAL_SIZE = process.stdout.columns

const main = async function ({ directory, modules }) {
  process.env.ARCANGEL_WORKER_MODE = "server"

  let logger: Logger | undefined

  try {
    /**
     * Setup
     */
    const container = await initializeContainer(directory)
    logger = container.resolve(ContainerRegistrationKeys.LOGGER)

    await ensureDbExists(container)

    const arcangelAppLoader = new ArcangelAppLoader()
    const configModule = container.resolve(
      ContainerRegistrationKeys.CONFIG_MODULE
    )

    const plugins = await getResolvedPlugins(directory, configModule, true)
    mergePluginModules(configModule, plugins, directory)

    const linksSourcePaths = plugins.map((plugin) =>
      join(plugin.resolve, "links")
    )
    await new LinkLoader(linksSourcePaths, logger).load()

    /**
     * Reverting migrations
     */
    logger.info("Reverting migrations...")

    const migrator = new Migrator({ container })
    await migrator.ensureMigrationsTable()

    await arcangelAppLoader.runModulesMigrations({
      moduleNames: modules,
      action: "revert",
    })
    logger.log(new Array(TERMINAL_SIZE).join("-"))
    logger.info("Migrations reverted")

    process.exit()
  } catch (error: any) {
    if (logger) {
      logger.log(new Array(TERMINAL_SIZE).join("-"))
      if (error.code && error.code === ArcangelError.Codes.UNKNOWN_MODULES) {
        logger.error(error.message)
        const modulesList = error.allModules.map(
          (name: string) => `          - ${name}`
        )
        logger.error(`Available modules:\n${modulesList.join("\n")}`)
      } else {
        logger.error(error.message, error)
      }
    } else {
      console.error(error)
    }
    process.exit(1)
  }
}

export default main
