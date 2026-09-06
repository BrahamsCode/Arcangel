import path from "path"
import { FileSystem } from "../file-system"
import { getResolvedPlugins } from "../get-resolved-plugins"
import { mergePluginModules } from "../merge-plugin-modules"
import { resolveFromProject } from "../resolve-from-project"

const BASE_DIR = path.join(__dirname, "merge-plugin-modules-proj")
const fs = new FileSystem(BASE_DIR)

const PLUGIN_NAME = "arcangel-plugin-hoisted-test"

/**
 * Creates a plugin inside "<BASE_DIR>/node_modules" that exposes a single
 * "blog" module.
 *
 * "<BASE_DIR>/node_modules" is NOT an ancestor of this file's own
 * "node_modules" chain, which is exactly the situation in a workspace monorepo:
 * `@arcangel/utils` sits in the hoisted workspace-root "node_modules" while the
 * plugin lives inside the Arcangel application's "node_modules".
 */
async function createHoistedPlugin() {
  const pluginRoot = `node_modules/${PLUGIN_NAME}`

  await fs.createJson(`${pluginRoot}/package.json`, {
    name: PLUGIN_NAME,
    version: "1.0.0",
    exports: {
      "./package.json": "./package.json",
      "./.arcangel/server/src/modules/*":
        "./.arcangel/server/src/modules/*/index.js",
    },
  })

  await fs.create(
    `${pluginRoot}/.arcangel/server/src/modules/blog/index.js`,
    `module.exports = {
       default: {
         service: class BlogService {
           static __joinerConfig = { serviceName: "blog" }
         },
       },
     }
     module.exports.default.service.prototype.__joinerConfig = {
       serviceName: "blog",
     }
    `
  )
}

afterEach(async () => {
  await fs.cleanup()
})

describe("mergePluginModules | hoisted @arcangel/utils", () => {
  test("resolves plugin modules relative to the project directory", async () => {
    await createHoistedPlugin()

    const plugins = await getResolvedPlugins(
      fs.basePath,
      {
        plugins: [{ resolve: PLUGIN_NAME, options: {} }],
      } as any,
      false
    )

    const pluginDetails = plugins.find((plugin) => plugin.name === PLUGIN_NAME)!

    /**
     * The plugin exposes its modules through a bare specifier, which is the
     * specifier that used to be resolved from wherever `@arcangel/utils` was
     * installed instead of from the project.
     */
    expect(pluginDetails.modules).toEqual([
      {
        resolve: `${PLUGIN_NAME}/.arcangel/server/src/modules/blog`,
        options: {},
      },
    ])

    const configModule = { modules: {} } as any
    mergePluginModules(configModule, plugins, fs.basePath)

    expect(configModule.modules.blog).toBeDefined()
    expect(configModule.modules.blog.resolve).toEqual(
      `${PLUGIN_NAME}/.arcangel/server/src/modules/blog`
    )
  })

  test("cannot be resolved without the project directory", async () => {
    await createHoistedPlugin()

    const specifier = `${PLUGIN_NAME}/.arcangel/server/src/modules/blog`

    /**
     * Guards the regression test above: the plugin genuinely is unreachable
     * through the default resolution algorithm, so the test would fail if the
     * project directory stopped being taken into account.
     */
    expect(() => require.resolve(specifier)).toThrow()

    expect(resolveFromProject(specifier, fs.basePath)).toEqual(
      path.join(
        fs.basePath,
        "node_modules",
        PLUGIN_NAME,
        ".arcangel/server/src/modules/blog/index.js"
      )
    )
  })
})
