import { describe, expect, it } from 'bun:test'
import { transform } from '@babel/core'
import betterSolid from '.'
import dedent from 'dedent'

describe('Short-circuit evaluation', () => {
  it('Compiling process should be successful', () => {
    const source = dedent`
      function App() {
        return <div>{a && <div>v</div>}</div>
      }
    `
    const expected = dedent`
      import { _Map } from "tsolid/runtime";
      import { Show as _Show } from "solid-js";
      function App() {
        return <div><_Show when={a}><div>v</div></_Show></div>;
      }
    `
    const actual = transform(source, {
      plugins: [betterSolid()],
    })?.code
    expect(actual).toBe(expected)
  })
})
describe('ternary operator', () => {
  it('Compiling process should be successful', () => {
    const source = dedent`
      function App() {
        return <div>{a ? <div>true</div> : <div>false</div>}</div>
      }
    `
    const expected = dedent`
      import { _Map } from "tsolid/runtime";
      import { Show as _Show } from "solid-js";
      function App() {
        return <div><_Show when={a} fallback={<div>false</div>}><div>true</div></_Show></div>;
      }
    `
    const actual = transform(source, {
      plugins: [betterSolid()],
    })?.code
    expect(actual).toBe(expected)
  })
})
describe('Array', () => {
  it('Compiling process should be successful', () => {
    const source = dedent`
      function App() {
        return <div>{[1, 2, 3].map((item) => <div>{item}</div>)}</div>
      }
    `
    const expected = dedent`
      import { _Map } from "tsolid/runtime";
      import { Show as _Show } from "solid-js";
      function App() {
        return <div><_Map i={[1, 2, 3]} f={item => <div>{item}</div>} /></div>;
      }
    `
    const actual = transform(source, {
      plugins: [betterSolid()],
    })?.code
    expect(actual).toBe(expected)
  })
})
