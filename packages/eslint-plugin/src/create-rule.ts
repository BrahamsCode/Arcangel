import { ESLintUtils } from "@typescript-eslint/utils"

export interface ArcangelRuleDocs {
  description: string
  recommended?: boolean
  strict?: boolean
  requiresTypeChecking?: boolean
}

export const createRule = ESLintUtils.RuleCreator<ArcangelRuleDocs>(
  (name) => `https://docs.arcangel.com/resources/lint/rules/${name}`
)
