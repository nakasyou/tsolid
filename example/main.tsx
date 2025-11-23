import { render } from 'solid-js/web'
import { tsignal } from '../src/core'

const App = () => {
  const s = tsignal([0, 1, 2])
  return (
    <div>
      {s.v.map((v) => (
        <div>{v}</div>
      ))}
    </div>
  )
}

render(() => <App />, document.getElementById('root') as HTMLElement)
