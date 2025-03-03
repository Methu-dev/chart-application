import React from 'react'
import SingUp from './Pages'
import { BrowserRouter, Routes, Route } from "react-router";
import Singin from './Pages/SingIn/Singin';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/singup" element={<SingUp />} />
      <Route path="/singin" element={<Singin />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App