import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-full bg-slate-400 h-full'>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </div>

  )
}

export default App
