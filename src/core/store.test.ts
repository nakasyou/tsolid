import { describe, expect, it, jest } from 'bun:test'
import { tstore } from './store'

describe('Store', () => {
  it('Should create a transparent store proxy', () => {
    const store = tstore({ a: 1, b: { c: 2 } })
    expect(store.a).toBe(1)
    expect(store.b.c).toBe(2)
  })
  it('Should update store properties transparently', () => {
    const store = tstore({ a: 1, b: { c: 2 } })
    store.a = 10
    store.b.c = 20
    expect(store.a).toBe(10)
    expect(store.b.c).toBe(20)
  })
})
