import { DashboardApp } from "./dashboard-app"
import { DashboardPlugin } from "./dashboard-app/types"

import displayModule from "virtual:arcangel/displays"
import formModule from "virtual:arcangel/forms"
import i18nModule from "virtual:arcangel/i18n"
import layoutModule from "virtual:arcangel/layouts"
import menuItemModule from "virtual:arcangel/menu-items"
import routeModule from "virtual:arcangel/routes"
import widgetModule from "virtual:arcangel/widgets"
import "virtual:arcangel/cell-renderers"
import "virtual:arcangel/search-entities"

import { defineCellRenderer } from "./lib/table/cell-renderers"
import {
  clearSearchEntities,
  defineSearchEntity,
} from "./lib/search/search-entities"

import "./index.css"

import { registerReloadOnPreloadError } from "./lib/reload-on-preload-error"

if (typeof window !== "undefined") {
  registerReloadOnPreloadError()
}

const localPlugin = {
  widgetModule,
  routeModule,
  displayModule,
  formModule,
  menuItemModule,
  i18nModule,
  layoutModule,
}

interface AppProps {
  plugins?: DashboardPlugin[]
}

function App({ plugins = [] }: AppProps) {
  const app = new DashboardApp({
    plugins: [localPlugin, ...plugins],
  })

  return <div>{app.render()}</div>
}

export { defineCellRenderer, defineSearchEntity, clearSearchEntities }
export default App
