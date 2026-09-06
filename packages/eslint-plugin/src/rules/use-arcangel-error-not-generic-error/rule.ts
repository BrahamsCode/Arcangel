import type { TSESLint, TSESTree } from "@typescript-eslint/utils"
import { AST_NODE_TYPES } from "@typescript-eslint/utils"
import { createRule } from "../../create-rule"
import { FRAMEWORK_UTILS_SOURCE } from "../../constants"

type MessageIds = "useArcangelError" | "replaceWithArcangelError"

/** The framework class to throw instead of a generic error. */
const ARCANGEL_ERROR = "ArcangelError"

/**
 * Neutral default error type used in the suggested rewrite. The developer is
 * expected to pick a more specific `ArcangelError.Types.*` (e.g. `NOT_FOUND`,
 * `INVALID_DATA`) — that's why this is a suggestion, not an autofix.
 */
const DEFAULT_ERROR_TYPE = `${ARCANGEL_ERROR}.Types.UNEXPECTED_STATE`

/**
 * Built-in JavaScript error constructors. Throwing any of these in Arcangel code
 * loses the structured `type` that Arcangel relies on to map errors to HTTP
 * statuses and consistent client responses. Use `ArcangelError` instead.
 */
const GENERIC_ERROR_NAMES: ReadonlySet<string> = new Set([
  "Error",
  "TypeError",
  "RangeError",
  "SyntaxError",
  "ReferenceError",
  "EvalError",
  "URIError",
  "AggregateError",
])

export const rule = createRule<[], MessageIds>({
  name: "use-arcangel-error-not-generic-error",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Throw `ArcangelError` rather than a generic `Error`. `ArcangelError` carries a `type` that Arcangel maps to the right HTTP status and a consistent client response.",
    },
    hasSuggestions: true,
    messages: {
      useArcangelError:
        "Throw `ArcangelError` instead of a generic `{{ name }}`. Use `new ArcangelError(ArcangelError.Types.X, \"...\")` so the error maps to the correct HTTP status.",
      replaceWithArcangelError:
        "Replace with `new ArcangelError({{ type }}, ...)` (pick the appropriate `ArcangelError.Types.*`).",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode()

    // Track the `@arcangel/framework/utils` import so the suggestion can add
    // `ArcangelError` to it (or insert a new import) when it isn't already
    // imported. Imports sit above throw statements in source order, so this is
    // fully resolved by the time any `ThrowStatement` is visited.
    let utilsImportNode: TSESTree.ImportDeclaration | null = null
    let arcangelErrorImported = false

    return {
      ImportDeclaration(node) {
        if (node.source.value !== FRAMEWORK_UTILS_SOURCE) {
          return
        }
        utilsImportNode = node
        for (const specifier of node.specifiers) {
          if (
            specifier.type === AST_NODE_TYPES.ImportSpecifier &&
            specifier.imported.type === AST_NODE_TYPES.Identifier &&
            specifier.imported.name === ARCANGEL_ERROR
          ) {
            arcangelErrorImported = true
          }
        }
      },

      ThrowStatement(node) {
        const arg = node.argument
        if (
          arg.type !== AST_NODE_TYPES.NewExpression ||
          arg.callee.type !== AST_NODE_TYPES.Identifier ||
          !GENERIC_ERROR_NAMES.has(arg.callee.name)
        ) {
          return
        }

        const newExpr = arg
        const calleeName = arg.callee.name

        context.report({
          node: newExpr,
          messageId: "useArcangelError",
          data: { name: calleeName },
          suggest: [
            {
              messageId: "replaceWithArcangelError",
              data: { type: DEFAULT_ERROR_TYPE },
              fix(fixer) {
                const argsText = newExpr.arguments
                  .map((a) => sourceCode.getText(a))
                  .join(", ")
                const newArgs = argsText
                  ? `${DEFAULT_ERROR_TYPE}, ${argsText}`
                  : DEFAULT_ERROR_TYPE
                const fixes = [
                  fixer.replaceText(newExpr, `new ${ARCANGEL_ERROR}(${newArgs})`),
                ]

                if (!arcangelErrorImported) {
                  fixes.push(addArcangelErrorImport(fixer))
                }

                return fixes
              },
            },
          ],
        })
      },
    }

    function addArcangelErrorImport(fixer: TSESLint.RuleFixer): TSESLint.RuleFix {
      if (utilsImportNode) {
        const namedSpecifiers = utilsImportNode.specifiers.filter(
          (s): s is TSESTree.ImportSpecifier =>
            s.type === AST_NODE_TYPES.ImportSpecifier
        )
        if (namedSpecifiers.length > 0) {
          const last = namedSpecifiers[namedSpecifiers.length - 1]
          return fixer.insertTextAfter(last, `, ${ARCANGEL_ERROR}`)
        }
        // Default/namespace-only import from utils — prepend a separate named
        // import line rather than rewriting the existing one.
        return fixer.insertTextBefore(
          utilsImportNode,
          `import { ${ARCANGEL_ERROR} } from "${FRAMEWORK_UTILS_SOURCE}"\n`
        )
      }

      // No utils import at all — add one at the top of the file.
      const firstNode = sourceCode.ast.body[0]
      const importText = `import { ${ARCANGEL_ERROR} } from "${FRAMEWORK_UTILS_SOURCE}"\n`
      return firstNode
        ? fixer.insertTextBefore(firstNode, importText)
        : fixer.insertTextBeforeRange([0, 0], importText)
    }
  },
})

export default rule
