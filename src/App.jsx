import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import Singin from './Pages/SingIn/Singin';
import SingUp from './Pages/Index';
import Home from './Pages/Home/Home';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/singup" element={<SingUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/singin" element={<Singin />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App