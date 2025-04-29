import { Show, For, type JSX } from 'solid-js'

/**
 * @internal
 */
export function _Map(props: {
  i: unknown
  f: (item: unknown, index: number) => JSX.Element
}) {
  return <Show when={Array.isArray(props.i)} fallback={<></>}>{(arr: () => unknown[]) => <For each={arr()}>
    {(item, index) => props.f(item, index())}
  </For>}</Show>
}
