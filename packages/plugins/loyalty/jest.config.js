const defineJestConfig = require("../../../define_jest_config")
module.exports = defineJestConfig({
  // the plugin builds into `.arcangel/server`, which mirrors `src` and would
  // otherwise be picked up as a duplicate (and partly broken) set of suites.
  // the dot must be escaped: these are regexes, and the repo root path itself
  // contains `arcangel/`.
  modulePathIgnorePatterns: [`dist/`, `\\.arcangel/`],
  testPathIgnorePatterns: [
    `dist/`,
    `\\.arcangel/`,
    `node_modules/`,
    `__fixtures__/`,
    `__mocks__/`,
  ],
})
