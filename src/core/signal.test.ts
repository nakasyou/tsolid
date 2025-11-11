import { describe, expect, it } from 'bun:test'
import { fromAccessor, signal } from './signal'

describe('Signal', () => {
  it('Should create a signal', () => {
    const s = signal(1)
    expect(s.v).toBe(1)
    s.v = 2
    expect(s.v).toBe(2)
  })
})

describe('fromAccessor', () => {
  it('Should create a readonly signal from accessor', () => {
    const s = signal(1)
    const ro = fromAccessor(() => s.v)
    expect(ro.v).toBe(1)
    s.v = 2
    expect(ro.v).toBe(2)
  })
})

describe('memo', () => {
  it('Should create a readonly memo signal', () => {
    const s = signal(1)
    const m = fromAccessor(() => s.v * 2)
    expect(m.v).toBe(2)
    s.v = 3
    expect(m.v).toBe(6)
  })
})
