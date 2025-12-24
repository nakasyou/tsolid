// biome-ignore-all lint/suspicious/noExplicitAny: needed for proxying

import { createStore, type SetStoreFunction } from "solid-js/store"

const createProxy = (
  curStore: any,
  setStore: SetStoreFunction<any>,
  path: (string | symbol)[] = []
) => {
  if (typeof curStore !== 'object' || curStore === null) {
    return curStore // primitives are returned as is
  }

  return new Proxy(curStore, {
    get(target, prop) {
      const state = target[prop]
      return createProxy(state, setStore, path.concat(prop))
    },
    set(_target, prop, value) {
      const targetPath = path.concat(prop)
      // @ts-expect-error too complex to type
      setStore(...targetPath, value)
      return true
    },
  })
}

/**
 * Create a transparent store proxy
 * @param defaultValue default value
 * @returns proxy
 */
export const tstore = <T extends object>(defaultValue: T): T => {
  const [store, setStore] = createStore<T>(defaultValue)

  return createProxy(store, setStore, [])
}
