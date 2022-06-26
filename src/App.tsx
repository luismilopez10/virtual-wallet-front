import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Link to='/'></Link>
      <Routes>
        <Route path="/login" element={<></>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
