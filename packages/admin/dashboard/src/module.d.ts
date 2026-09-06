declare module "virtual:arcangel/forms" {
  import type { FormModule } from "./extensions"
  const formModule: FormModule
  export default formModule
}

declare module "virtual:arcangel/links" {
  import type { LinkModule } from "./extensions"
  const linkModule: LinkModule
  export default linkModule
}

declare module "virtual:arcangel/displays" {
  import type { DisplayModule } from "./extensions"
  const displayModule: DisplayModule
  export default displayModule
}

declare module "virtual:arcangel/routes" {
  import type { RouteModule } from "./extensions"
  const routeModule: RouteModule
  export default routeModule
}

declare module "virtual:arcangel/menu-items" {
  import type { MenuItemModule } from "./extensions"
  const menuItemModule: MenuItemModule
  export default menuItemModule
}

declare module "virtual:arcangel/widgets" {
  import type { WidgetModule } from "./extensions"
  const widgetModule: WidgetModule
  export default widgetModule
}

declare module "virtual:arcangel/i18n" {
  import type { I18nModule } from "./extensions"
  const i18nModule: I18nModule
  export default i18nModule
}

declare module "virtual:arcangel/layouts" {
  import type { LayoutModule } from "./extensions"
  const layoutModule: LayoutModule
  export default layoutModule
}

declare module "virtual:arcangel/cell-renderers" {
  // Side-effect only module: registers custom cell renderers.
}

declare module "virtual:arcangel/search-entities" {
  // Side-effect only module: registers custom search entities.
}
