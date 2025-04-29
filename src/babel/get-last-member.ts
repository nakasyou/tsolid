import type { MemberExpression } from "@babel/types";

export const getLastMember = (node: MemberExpression): string | null => {
  let current: MemberExpression | null = node;

  while (true) {
    if (current.property.type === 'Identifier') {
      return current.property.name;
    }
    if (current.property.type === 'MemberExpression') {
      current = current.property
      continue
    }
    return null
  }
}
