import { useState } from 'react'
import './App.css'
import { Consumer } from './components/Comsumer.tsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>React Service Locator pattern</h1>
        <Consumer />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
