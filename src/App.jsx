import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import Singin from './Pages/SingIn/Singin';
import SingUp from './Pages/Index';
import Home from './Pages/Home/Home';
import Rootlayotu from './Components/RootLayout/Rootlayotu';
import Chat from './Pages/Chat/Chat';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    
    <Route path="/" element={<Rootlayotu />} >
    <Route index element={<Home />}></Route>
    <Route path='/message' element={<Chat />}></Route>
    <Route path='/notification' element={"this is notification page"}></Route>
    <Route path='/setting' element={"this is setting"}></Route>
    </Route>


      <Route path="/singup" element={<SingUp />} />
      <Route path="/singin" element={<Singin />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App