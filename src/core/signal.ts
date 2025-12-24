import { type Accessor, createMemo, createSignal } from 'solid-js'

/**
 * A signal optimized for TypeScript usage.
 */
export interface TSignal<T> {
  v: T
}

/**
 * @deprecated Use `TSignal` instead.
 */
export type Signal<T> = TSignal<T>

/**
 * A readonly signal optimized for TypeScript usage.
 */
export interface ReadonlySignal<T> {
  readonly v: T
}

/**
 * Create a signal optimized for TypeScript usage.
 */
export function tsignal<T>(): TSignal<T | undefined>
export function tsignal<T>(value: T): TSignal<T>
export function tsignal<T>(value?: T): TSignal<T | undefined> {
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

/**
 * Create a readonly signal from an Solid.js's accessor.
 * @param ac The accessor function.
 * @returns A readonly signal.
 */
export const fromAccessor = <T>(ac: Accessor<T>): ReadonlySignal<T> => ({
  get v() {
    return ac()
  },
})

/**
 * Create a memoized readonly signal for TypeScript usage.
 * @param fn The function to memoize.
 * @returns A readonly memoized signal.
 */
export const tmemo = <T>(fn: () => T): ReadonlySignal<T> =>
  fromAccessor(createMemo(fn))

/**
 * @deprecated Use `tsignal` instead.
 */
export const signal = tsignal

/**
 * @deprecated Use `tmemo` instead.
 */
export const memo = tmemo
