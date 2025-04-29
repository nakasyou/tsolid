import solid, { type Options } from 'vite-plugin-solid'
import type { PluginItem, PluginObj } from '@babel/core'
// @ts-ignore
import SyntaxJSX from '@babel/plugin-syntax-jsx'
import * as t from '@babel/types'
import { componentMap, componentShow } from './components'
import { getLastMember } from './get-last-member'

/**
 * Babel plugin for providing better development experience with SolidJS.
 *
 * @example
 * ```ts
 * import { defineConfig } from 'vite'
 * import betterSolid from 'babel-plugin-better-solid'
 * import solid from 'vite-plugin-solid'
 *
 * export default defineConfig({
 *   plugins: [
 *     solid({
 *       babel: {
 *         plugins: [betterSolid()]
 *       }
 *     }),
 *   ]
 * })
 */
export default function tsolid(opts: {
  /** @default `solid-js` */
  solidPath?: string
  /** @default `tsolid/runtime` */
  tsolidRuntimePath?: string
} = {}): PluginItem {
  const solidPath = opts.solidPath ?? 'solid-js'
  const tsolidPath = opts.tsolidRuntimePath ?? 'tsolid/runtime'

  return (): PluginObj => {
    let identifierShow!: t.Identifier
    let identifierMap!: t.Identifier

    return {
      name: 'babel-plugin-better-solid',
      inherits: SyntaxJSX,
      visitor: {
        Program: {
          enter(path) {
            identifierShow = path.scope.generateUidIdentifier('Show')
            path.node.body.unshift(
              t.importDeclaration(
                [t.importSpecifier(identifierShow, t.identifier('Show'))],
                t.stringLiteral(solidPath),
              ),
            )
            identifierMap = path.scope.generateUidIdentifier('Map')
            path.node.body.unshift(
              t.importDeclaration(
                [t.importSpecifier(identifierMap, t.identifier('_Map'))],
                t.stringLiteral(tsolidPath),
              ),
            )
          },
        },
        JSXExpressionContainer: {
          enter(path) {
            path.traverse({
              LogicalExpression: {
                enter(path) {
                  let elem: t.JSXElement | undefined
                  switch (path.node.operator) {
                    case '&&': {
                      const { left, right } = path.node
                      elem = componentShow(identifierShow, left, right)
                      break
                    }
                  }
                  if (!elem) {
                    return
                  }
                  if (path.parentPath.isJSXExpressionContainer()) {
                    path.parentPath.replaceWith(elem)
                  } else {
                    path.replaceWith(elem)
                  }
                },
              },
              ConditionalExpression(path) {
                const { test, consequent, alternate } = path.node
                const elem = componentShow(
                  identifierShow,
                  test,
                  consequent,
                  alternate as t.JSXElement | t.JSXFragment,
                )
                if (path.parentPath.isJSXExpressionContainer()) {
                  path.parentPath.replaceWith(elem)
                } else {
                  path.replaceWith(elem)
                }
              },
              CallExpression(path) {
                if (
                  path.node.callee.type === 'MemberExpression'
                  && getLastMember(path.node.callee) === 'map'
                  && path.node.arguments[0]
                  && t.isExpression(path.node.arguments[0])
                ) {
                  (path.parentPath.isJSXExpressionContainer() ? path.parentPath : path).replaceWith(componentMap(
                    identifierMap,
                    path.node.callee.object,
                    path.node.arguments[0],
                  ))
                }
                path.skip()
              },
              BinaryExpression(path) {
                path.skip()
              },
              JSXElement(path) {
                path.skip()
              },
              JSXFragment(path) {
                path.skip()
              },
              BlockStatement(path) {
                path.skip()
              },
              ArrowFunctionExpression(path) {
                path.skip()
              },
            })
          },
        },
      },
    }
  }
}
