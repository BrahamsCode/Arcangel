import type { ArcangelAppLoader } from "@arcangel/framework"
import { logger } from "@arcangel/framework/logger"
import {
  ConfigModule,
  Logger,
  ArcangelContainer,
  SearchTypes,
} from "@arcangel/framework/types"
import {
  ContainerRegistrationKeys,
  getResolvedPlugins,
  Modules,
} from "@arcangel/framework/utils"
import { join } from "path"

/**
 * Initiates the database connection
 */
export async function initDb() {
  const { pgConnectionLoader } = await import("@arcangel/framework")

  const pgConnection = await pgConnectionLoader()

  return pgConnection
}

/**
 * Migrates the database
 */
export async function migrateDatabase(appLoader: ArcangelAppLoader) {
  try {
    await appLoader.runModulesMigrations()
  } catch (err) {
    logger.error("Something went wrong while running the migrations")
    throw err
  }
}

/**
 * Syncs links with the databse
 */
export async function syncLinks(
  appLoader: ArcangelAppLoader,
  directory: string,
  container: ArcangelContainer,
  logger: Logger
) {
  try {
    await loadCustomLinks(directory, container)

    const planner = await appLoader.getLinksExecutionPlanner()
    const actionPlan = await planner.createPlan()
    actionPlan.forEach((action) => {
      logger.info(`Sync links: "${action.action}" ${action.tableName}`)
    })
    await planner.executePlan(actionPlan)
  } catch (err) {
    logger.error("Something went wrong while syncing links")
    throw err
  }
}

async function loadCustomLinks(directory: string, container: ArcangelContainer) {
  const configModule = container.resolve(
    ContainerRegistrationKeys.CONFIG_MODULE
  )
  const plugins = await getResolvedPlugins(directory, configModule, true)
  const linksSourcePaths = plugins.map((plugin) =>
    join(plugin.resolve, "links")
  )
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  const { LinkLoader } = await import("@arcangel/framework")
  await new LinkLoader(linksSourcePaths, logger).load()
}

/**
 * Filling the indexes is left to application start (and optional `reindex()`).
 */
export async function migrateSearchIndexes(
  container: ArcangelContainer,
  logger: Logger
) {
  const configModule = container.resolve(
    ContainerRegistrationKeys.CONFIG_MODULE
  ) as ConfigModule

  // Same optional peer import the runner already uses for `loadSearchIndexes`.
  const { isSearchModuleEnabled } = require("@arcangel/arcangel/loaders/search")

  if (!isSearchModuleEnabled(configModule)) {
    return
  }

  try {
    const searchModule = container.resolve(
      Modules.SEARCH
    ) as SearchTypes.ISearchModuleService

    const plan = await searchModule.createIndexMigrationPlan()
    const pending = plan.filter((action) => action.action !== "noop")

    if (!pending.length) {
      logger.info("Search indexes already up-to-date")
      return
    }

    logger.info(
      `Migrating search indexes: ${pending
        .map((action) => `${action.index} (${action.action})`)
        .join(", ")}`
    )

    await searchModule.executeIndexMigrationPlan(plan)
  } catch (err) {
    logger.error("Something went wrong while migrating search indexes")
    throw err
  }
}
