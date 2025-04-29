# tsolid

tsolid is a SolidJS extension that provides better TypeScript experience by allowing a way to writing JSX like React.

## Why

SolidJS is very fast because it compiles JSX to fine-grained reactivity. However, by doing so, it has some constraints such as that you need to use `Show`, `For`, `Index` instead of short-curcuit evaluation (`&&`), Array.prototype.map. This is necessary to make your application fast, but it makes TypeScript experience worse than React.
For example:
```tsx
const App = () => {
  const value: string | number = 'Hello World'
  return (
    <Show when={typeof value === 'string'}>
      <div>{
        value.toUpperCase() // TS error: Property 'toUpperCase' does not exist on type 'string | number'
      }</div>
    </Show>
  )
}
```
In React, you can write a code like `typeof value === 'string' && <div>{value.toUpperCase()}</div>` and TypeScript will narrow the type of `value` to `string`.

This library provides a way to write JSX like React, but still compiled code is fast like SolidJS.

For instance, you can write a code like this:
```tsx
import { signal } from 'tsolid'

const App = () => {
  const value = signal<string | number>('Hello World')
  return (
    <>
      {typeof value() === 'string' && <div>{value().toUpperCase()}</div>}
    </>
  )
}
```
This code will be compiled to:
```jsx
import { signal } from 'tsolid'
import { Show } from 'solid-js'

const App = () => {
  const value = signal<string | number>('Hello World')
  return (
    <>
      <Show when={typeof value.v === 'string'}>
        <div>{value.v.toUpperCase()}</div>
      </Show>
    </>
  )
}
```

And, tsolid also provides a better Signal API, `signal`.
If you are using `createSignal`, a TypeScript inferce is sometimes not good:
```ts
const [value, setValue] = createSignal<string | null>('Hello World')
if (value() === null) {
  // TS error: Type 'null' is not assignable to type 'string'
  value().toUpperCase()
}
```
This is because getting signal value is a function, so TypeScript cannot infer the type of `value` correctly.

So, tsolid provides a better signal API, `signal`, which can get value by getter/setter using `v`.
```ts
import { signal } from 'tsolid'
const value = signal<string | null>('Hello World')
if (value.v === null) {
  // OK
  value.v.toUpperCase()
}
```

## Installation

```bash
bun add tsolid # Bun
deno add npm:tsolid # Deno
pnpm add tsolid # pnpm
yarn add tsolid # yarn
npm install tsolid # npm
```

If you are using Vite, you need to add the following to your `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import tsolid from 'tsolid/babel'

export default defineConfig({
  plugins: [
    solidPlugin({
      babel: {
        plugins: [
          // add here
          tsolid(),
        ],
      }
    }),
  ],
})
```
