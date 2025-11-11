import { type Accessor, createMemo, createSignal } from 'solid-js'

export interface Signal<T> {
  v: T
}
export interface ReadonlySignal<T> {
  readonly v: T
}
export function signal<T>(): Signal<T | undefined>
export function signal<T>(value: T): Signal<T>
export function signal<T>(value?: T): Signal<T | undefined> {
  const [getter, setter] = createSignal<T>(value as T)

  return {
    get v() {
      return getter()
    },
    set v(value: T) {
      setter(() => value)
    },
  }
}

export const fromAccessor = <T>(ac: Accessor<T>): ReadonlySignal<T> => ({
  get v() {
    return ac()
  },
})

export const memo = <T>(fn: () => T): ReadonlySignal<T> =>
  fromAccessor(createMemo(fn))
