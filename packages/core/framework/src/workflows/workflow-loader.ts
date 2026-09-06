import { ArcangelContainer } from "@arcangel/types"
import { isFileSkipped } from "@arcangel/utils"
import { ArcangelWorkflow } from "@arcangel/workflows-sdk"
import { logger } from "../logger"
import { ResourceLoader } from "../utils/resource-loader"

export class WorkflowLoader extends ResourceLoader {
  protected resourceName = "workflow"

  constructor(sourceDir: string | string[], container: ArcangelContainer) {
    super(sourceDir, container)
  }

  protected async onFileLoaded(
    path: string,
    fileExports: Record<string, unknown>
  ) {
    if (isFileSkipped(fileExports)) {
      const exportedFns = Object.keys(fileExports)
      for (const exportedFn of exportedFns) {
        const fn = fileExports[exportedFn] as any
        if (fn?.getName?.()) {
          ArcangelWorkflow.unregisterWorkflow(fn.getName())
        }
      }
      return
    }

    logger.debug(`Registering workflows from ${path}.`)
  }

  /**
   * Load workflows from the source paths, workflows are registering themselves,
   * therefore we only need to import them
   */
  async load() {
    // Workflows register themselves as a side effect of importing the file, so
    // unlike other loaders we also want to pick up workflows defined in an
    // `index.[js,ts]` file (e.g. `src/workflows/<name>/index.ts`).
    await super.discoverResources({ allowIndex: true })

    this.logger.debug(`Workflows registered.`)
  }
}
