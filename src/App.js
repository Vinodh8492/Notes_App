import React from 'react'
import Home from '../src/Components/Home/Home'
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Home/>
      </BrowserRouter>

    </div>
  )
}

export default App