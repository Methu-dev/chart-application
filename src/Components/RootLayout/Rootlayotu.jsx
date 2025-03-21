import React from 'react'
import Sidebar from '../HomeComponent/Sidebar'
import { Outlet } from 'react-router'

function Rootlayotu() {
  return (
    <div className='flex gap-x-[30px] p-3'>
        <Sidebar />
        <div className='w-full rounded-3xl h-[96dvh] shadow-2xl bg-gray-100'>
           <Outlet />
        </div>
    </div>
  )
}

export default Rootlayotu