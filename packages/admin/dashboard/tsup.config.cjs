import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    // `@arcangel/dashboard`
    app: "./src/app.tsx",
    // `@arcangel/dashboard/components`
    components: "./src/exports/components.tsx",
    // `@arcangel/dashboard/hooks`
    hooks: "./src/exports/hooks.ts",
    // `@arcangel/dashboard/lib`
    lib: "./src/exports/lib.ts",
  },
  format: ["cjs", "esm"],
  external: [
    "virtual:arcangel/forms",
    "virtual:arcangel/displays",
    "virtual:arcangel/routes",
    "virtual:arcangel/links",
    "virtual:arcangel/menu-items",
    "virtual:arcangel/widgets",
    "virtual:arcangel/i18n",
    "virtual:arcangel/cell-renderers",
    "virtual:arcangel/layouts",
    "virtual:arcangel/search-entities",
  ],
  tsconfig: "tsconfig.build.json",
  dts: {
    entry: {
      index: "./src/index.ts",
      components: "./src/exports/components.tsx",
      hooks: "./src/exports/hooks.ts",
      lib: "./src/exports/lib.ts",
    },
  },
  clean: true,
})
