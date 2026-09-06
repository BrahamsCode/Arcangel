import { LinkLoader, ArcangelAppLoader } from "@arcangel/framework"
import { ArcangelModule } from "@arcangel/framework/modules-sdk"
import {
  ContainerRegistrationKeys,
  FileSystem,
  generateContainerTypes,
  generateAugmentationRefs,
  getResolvedPlugins,
  gqlSchemaToTypes,
  mergePluginModules,
  validateModuleName,
} from "@arcangel/framework/utils"
import { Logger, ArcangelContainer } from "@arcangel/types"
import path, { join } from "path"

export async function generateTypes({
  directory,
  container,
  logger,
}: {
  directory: string
  container: ArcangelContainer
  logger: Logger
}) {
  logger.info("Generating types...")

  const configModule = container.resolve(
    ContainerRegistrationKeys.CONFIG_MODULE
  )

  const plugins = await getResolvedPlugins(directory, configModule, true)
  mergePluginModules(configModule, plugins, directory)

  Object.keys(configModule.modules ?? {}).forEach((key) => {
    validateModuleName(key)
  })

  const linksSourcePaths = plugins.map((plugin) =>
    join(plugin.resolve, "links")
  )
  await new LinkLoader(linksSourcePaths, logger).load()

  const { gqlSchema, modules } = await new ArcangelAppLoader().load({
    registerInContainer: false,
    schemaOnly: true,
  })

  const typesDirectory = path.join(directory, ".arcangel/types")

  /**
   * Cleanup existing types directory before creating new artifacts
   */
  await new FileSystem(typesDirectory).cleanup({ recursive: true })

  await generateContainerTypes(modules, {
    outputDir: typesDirectory,
    interfaceName: "ModuleImplementations",
  })
  logger.debug("Generated container types")

  if (gqlSchema) {
    await gqlSchemaToTypes({
      outputDir: typesDirectory,
      filename: "query-entry-points",
      interfaceName: "RemoteQueryEntryPoints",
      schema: gqlSchema,
      joinerConfigs: ArcangelModule.getAllJoinerConfigs(),
    })
    logger.debug("Generated modules types")
  }

  await generateAugmentationRefs({ directory, plugins, modules })
  logger.debug("Generated plugin augmentation types")

  logger.info("Types generated successfully")
}
