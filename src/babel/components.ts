import * as t from '@babel/types'

export const componentShow = (
  identifier: t.Identifier,
  when: t.Expression,
  children: t.Expression,
  fallback?: t.JSXElement | t.JSXFragment,
) => {
  return t.jsxElement(
    t.jsxOpeningElement(t.jsxIdentifier(identifier.name), [
      t.jsxAttribute(t.jsxIdentifier('when'), t.jsxExpressionContainer(when)),
      ...(fallback
        ? [
            t.jsxAttribute(
              t.jsxIdentifier('fallback'),
              t.jsxExpressionContainer(fallback),
            ),
          ]
        : []),
    ]),
    t.jsxClosingElement(t.jsxIdentifier(identifier.name)),
    [t.isJSXElement(children) ? children : t.jsxExpressionContainer(children)],
  )
}
export const componentMap = (
  identifier: t.Identifier,
  i: t.Expression,
  f: t.Expression,
) => {
  return t.jsxElement(
    t.jsxOpeningElement(t.jsxIdentifier(identifier.name), [
      t.jsxAttribute(t.jsxIdentifier('i'), t.jsxExpressionContainer(i)),
      t.jsxAttribute(t.jsxIdentifier('f'), t.jsxExpressionContainer(f)),
    ], true),
    null,
    [],
  )
}