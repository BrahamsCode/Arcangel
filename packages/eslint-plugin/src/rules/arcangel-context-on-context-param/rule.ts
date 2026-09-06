import type { TSESTree } from "@typescript-eslint/utils"
import { AST_NODE_TYPES } from "@typescript-eslint/utils"
import { createRule } from "../../create-rule"
import {
  createArcangelServiceBindings,
  getParamDecorators,
  getParamIdentifier,
  hasDecoratorWithLocalName,
  isContextTypedIdentifier,
  isArcangelServiceSuper,
  trackFrameworkUtilsImports,
  trackArcangelServiceImports,
} from "../../util/service-scope"

type MessageIds = "missingArcangelContext"

const ARCANGEL_CONTEXT = "ArcangelContext"

export const rule = createRule<[], MessageIds>({
  name: "arcangel-context-on-context-param",
  meta: {
    type: "problem",
    docs: {
      description:
        "Service method parameters typed `Context` must be decorated with `@ArcangelContext()`.",
    },
    fixable: "code",
    messages: {
      missingArcangelContext:
        "Service method parameters typed `Context` must be decorated with `@ArcangelContext()`.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const serviceBindings = createArcangelServiceBindings()
    const arcangelContextBinding = new Set<string>()

    function checkClass(
      node: TSESTree.ClassDeclaration | TSESTree.ClassExpression
    ) {
      if (!isArcangelServiceSuper(node.superClass, serviceBindings)) {
        return
      }

      for (const member of node.body.body) {
        if (member.type !== AST_NODE_TYPES.MethodDefinition) {
          continue
        }
        if (member.kind === "constructor") {
          continue
        }
        if (member.computed) {
          continue
        }
        const value = member.value
        // Skip TypeScript overload signatures (bodyless declarations): the
        // `@ArcangelContext()` decorator can only live on the implementation,
        // which is the method that carries a function body and is checked on
        // its own.
        if (value.type !== AST_NODE_TYPES.FunctionExpression) {
          continue
        }

        for (const param of value.params) {
          const id = getParamIdentifier(param)
          if (!id) {
            continue
          }
          if (!isContextTypedIdentifier(id)) {
            continue
          }

          if (
            hasDecoratorWithLocalName(
              getParamDecorators(param),
              arcangelContextBinding
            )
          ) {
            continue
          }

          const localName =
            arcangelContextBinding.values().next().value ?? ARCANGEL_CONTEXT
          const canAutofix = arcangelContextBinding.size > 0

          context.report({
            node: param,
            messageId: "missingArcangelContext",
            fix: canAutofix
              ? (fixer) => fixer.insertTextBefore(param, `@${localName}() `)
              : undefined,
          })
        }
      }
    }

    return {
      ImportDeclaration(node) {
        trackArcangelServiceImports(node, serviceBindings)
        trackFrameworkUtilsImports(node, {
          [ARCANGEL_CONTEXT]: arcangelContextBinding,
        })
      },

      ClassDeclaration: checkClass,
      ClassExpression: checkClass,
    }
  },
})

export default rule
