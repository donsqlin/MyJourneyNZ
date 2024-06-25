import { useState } from 'react'
import Home from './components/Home/Home.jsx'
import TomTomMap from './components/Map/Map.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Home />
        <TomTomMap />
    </>
  )
}

export default App
