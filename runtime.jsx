import { Show, For } from 'solid-js'

/**
 * @internal
 */
export function _Map(props) {
  return <Show when={Array.isArray(props.i)} fallback={null}>{(arr) => <For each={arr()}>
    {(item, index) => props.f(item, index())}
  </For>}</Show>
}
