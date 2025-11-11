import { For, Show } from 'solid-js'

/**
 * @internal
 */
export function _Map(props) {
  return (
    <Show when={Array.isArray(props.i)} fallback={null}>
      {
        <For each={props.i ?? []}>
          {(item, index) => <>{props.f(item, index())}</>}
        </For>
      }
    </Show>
  )
}
