import { render } from 'solid-js/web'
import { signal } from '../src/core'

const App = () => {
  const s = signal([0, 1, 2])
  return (
    <div>
      {s.v.map((v) => (
        <div>{v}</div>
      ))}
    </div>
  )
}

render(() => <App />, document.getElementById('root') as HTMLElement)
