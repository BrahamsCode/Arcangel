import { describe, it, expect } from "vitest"
import { npxToYarn } from "../npx-to-yarn.js"

describe("npxToYarn", () => {
  describe("yarn conversion", () => {
    it("should convert basic npx command to yarn", () => {
      const result = npxToYarn("npx arcangel db:migrate", "yarn")
      expect(result).toBe("yarn arcangel db:migrate")
    })

    it("should convert npx command with multiple arguments", () => {
      const result = npxToYarn("npx arcangel develop --port 9000", "yarn")
      expect(result).toBe("yarn arcangel develop --port 9000")
    })

    it("should convert npx command with flags", () => {
      const result = npxToYarn("npx arcangel user --email admin@test.com", "yarn")
      expect(result).toBe("yarn arcangel user --email admin@test.com")
    })

    it("should handle npx command with leading/trailing whitespace", () => {
      const result = npxToYarn("  npx arcangel db:migrate  ", "yarn")
      expect(result).toBe("yarn arcangel db:migrate")
    })

    it("should convert npx command to yarn dlx when isExecutable is true", () => {
      const result = npxToYarn("npx create-arcangel-app@latest", "yarn", true)
      expect(result).toBe("yarn dlx create-arcangel-app@latest")
    })

    it("should convert npx command to yarn when isExecutable is false", () => {
      const result = npxToYarn("npx arcangel db:migrate", "yarn", false)
      expect(result).toBe("yarn arcangel db:migrate")
    })
  })

  describe("pnpm conversion", () => {
    it("should convert basic npx command to pnpm", () => {
      const result = npxToYarn("npx arcangel db:migrate", "pnpm")
      expect(result).toBe("pnpm arcangel db:migrate")
    })

    it("should convert npx command with multiple arguments", () => {
      const result = npxToYarn("npx arcangel develop --port 9000", "pnpm")
      expect(result).toBe("pnpm arcangel develop --port 9000")
    })

    it("should convert npx command with flags", () => {
      const result = npxToYarn("npx arcangel user --email admin@test.com", "pnpm")
      expect(result).toBe("pnpm arcangel user --email admin@test.com")
    })

    it("should handle npx command with leading/trailing whitespace", () => {
      const result = npxToYarn("  npx arcangel db:migrate  ", "pnpm")
      expect(result).toBe("pnpm arcangel db:migrate")
    })

    it("should convert npx command to pnpm dlx when isExecutable is true", () => {
      const result = npxToYarn("npx create-arcangel-app@latest", "pnpm", true)
      expect(result).toBe("pnpm dlx create-arcangel-app@latest")
    })

    it("should convert npx command to pnpm when isExecutable is false", () => {
      const result = npxToYarn("npx arcangel db:migrate", "pnpm", false)
      expect(result).toBe("pnpm arcangel db:migrate")
    })
  })

  describe("edge cases", () => {
    it("should return original command if it does not start with npx", () => {
      const result = npxToYarn("npm install arcangel", "yarn")
      expect(result).toBe("npm install arcangel")
    })

    it("should handle command with only npx and package name", () => {
      const result = npxToYarn("npx arcangel", "yarn")
      expect(result).toBe("yarn arcangel")
    })

    it("should preserve command structure with special characters", () => {
      const result = npxToYarn("npx arcangel db:seed --file=./data.json", "pnpm")
      expect(result).toBe("pnpm arcangel db:seed --file=./data.json")
    })

    it("should handle command with path separators", () => {
      const result = npxToYarn("npx @arcangel/arcangel-cli develop", "yarn")
      expect(result).toBe("yarn @arcangel/arcangel-cli develop")
    })

    it("should handle multi-line commands with backslash continuation", () => {
      const multiLineCommand = `npx create-arcangel-app@latest \\
  --db-url postgres://localhost/arcangel \\
  --skip-db`
      const result = npxToYarn(multiLineCommand, "yarn", true)
      expect(result).toBe(`yarn dlx create-arcangel-app@latest \\
  --db-url postgres://localhost/arcangel \\
  --skip-db`)
    })

    it("should handle multi-line commands for pnpm", () => {
      const multiLineCommand = `npx arcangel develop \\
  --port 9000 \\
  --verbose`
      const result = npxToYarn(multiLineCommand, "pnpm")
      expect(result).toBe(`pnpm arcangel develop \\
  --port 9000 \\
  --verbose`)
    })

    it("should handle commands with newlines", () => {
      const commandWithNewlines = "npx create-arcangel-app@latest\n  --db-url postgres://localhost/arcangel"
      const result = npxToYarn(commandWithNewlines, "yarn", true)
      expect(result).toBe("yarn dlx create-arcangel-app@latest\n  --db-url postgres://localhost/arcangel")
    })

    it("should convert multiple npx commands on separate lines for yarn", () => {
      const multipleCommands = `npx arcangel db:migrate
npx arcangel develop`
      const result = npxToYarn(multipleCommands, "yarn")
      expect(result).toBe(`yarn arcangel db:migrate
yarn arcangel develop`)
    })

    it("should convert multiple npx commands on separate lines for pnpm", () => {
      const multipleCommands = `npx arcangel db:migrate
npx arcangel user --email admin@test.com
npx arcangel develop --port 9000`
      const result = npxToYarn(multipleCommands, "pnpm")
      expect(result).toBe(`pnpm arcangel db:migrate
pnpm arcangel user --email admin@test.com
pnpm arcangel develop --port 9000`)
    })

    it("should convert multiple npx commands with executable flag", () => {
      const multipleCommands = `npx create-arcangel-app@latest
npx @arcangel/arcangel-cli init`
      const result = npxToYarn(multipleCommands, "yarn", true)
      expect(result).toBe(`yarn dlx create-arcangel-app@latest
yarn dlx @arcangel/arcangel-cli init`)
    })

    it("should preserve indentation when converting multiple commands", () => {
      const indentedCommands = `npx arcangel db:migrate
  npx arcangel develop
    npx arcangel user`
      const result = npxToYarn(indentedCommands, "pnpm")
      expect(result).toBe(`pnpm arcangel db:migrate
  pnpm arcangel develop
    pnpm arcangel user`)
    })

    it("should handle mixed npx and non-npx lines", () => {
      const mixedCommands = `npx arcangel db:migrate
echo "Migration complete"
npx arcangel develop`
      const result = npxToYarn(mixedCommands, "yarn")
      expect(result).toBe(`yarn arcangel db:migrate
echo "Migration complete"
yarn arcangel develop`)
    })
  })
})
