import "@arcangel/utils"
export * from "@arcangel/types"

import type { ModuleOptions as ModuleOptionsType } from "@arcangel/types"

// Re-declare ModuleOptions to enable augmentation from @arcangel/framework/types
// EventBusEventsOptions is exported via "export *" and gets augmentations from @arcangel/utils
export interface ModuleOptions extends ModuleOptionsType {}
