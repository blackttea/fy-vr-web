import { useState } from 'react'
import './App.css'
import Lay from "./view/system/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            key={1}
            path='/'
            element={<Lay />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
