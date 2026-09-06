import { Logger } from "@arcangel/framework/types"
import { EntityOverride } from "../utils/entity-overrides"

export type InitializeModuleInjectableDependencies = {
  logger?: Logger
}

/**
 * Options accepted by the Settings module.
 *
 * @example
 * // arcangel-config.ts
 * module.exports = defineConfig({
 *   modules: [
 *     {
 *       resolve: "@arcangel/arcangel/settings",
 *       options: {
 *         entityOverrides: {
 *           Brand: {
 *             defaultVisibleFields: ["name", "products_count"],
 *             defaultFieldOrdering: { name: 100 },
 *             computedColumns: [
 *                {
 *                  id: "products_count",
 *                  name: "Product Count",
 *                  renderMode: "count",
 *                  requiredFields: ["products"],
 *                },
 *              ],
 *           },
 *         },
 *       },
 *     },
 *   ],
 * })
 */
export interface SettingsModuleOptions {
  /**
   * Entity overrides to merge into the override registry at startup, keyed by the entity name.
   * Merged with built-in overrides; provided values take precedence.
   */
  entityOverrides?: Record<string, EntityOverride>
}

declare module "@arcangel/types" {
  interface ModuleOptions {
    "@arcangel/settings": SettingsModuleOptions
    "@arcangel/arcangel/settings": SettingsModuleOptions
  }
}
