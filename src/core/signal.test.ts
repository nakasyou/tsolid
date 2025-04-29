import { describe, expect, it, mock } from 'bun:test'
import { signal } from './signal'

describe('Signal', () => {
  it('Should create a signal', () => {
    const s = signal(1)
    expect(s.v).toBe(1)
    s.v = 2
    expect(s.v).toBe(2)
  })
})
