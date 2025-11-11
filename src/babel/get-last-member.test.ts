import { describe, expect, it } from 'bun:test'
import * as t from '@babel/types'
import { getLastMember } from './get-last-member'

describe('getLastMember', () => {
  it('should return the last member name from a MemberExpression', () => {
    const node = t.memberExpression(
      t.memberExpression(t.identifier('a'), t.identifier('b')),
      t.identifier('c'),
    )

    const result = getLastMember(node)

    expect(result).toBe('c')
  })
})
