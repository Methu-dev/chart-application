import React from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { IoCloudUploadOutline, IoHomeOutline, IoSettingsOutline } from 'react-icons/io5'
import { LuMessageCircleMore } from 'react-icons/lu'
import { MdLogout } from 'react-icons/md'
import {useLocation, useNavigate,} from 'react-router'

function Sidebar() {
  const location = useLocation();
  const navigat = useNavigate();
  const navigation = [
    {
      id: 1,
      path: "/",
      icon: <IoHomeOutline />
    },

    {
      id: 2,
      path: "/message",
      icon: <LuMessageCircleMore />
    },

    {
      id: 3,
      path: "/notification",
      icon: <IoMdNotificationsOutline />

    },

    {
      id: 4,
      path: "/setting",
      icon: <IoSettingsOutline />
    },

    {
      id: 5,
      icon: <MdLogout />
    },
  ]
// hendle icon impliment
const handleIcon = (path)=>{
  navigat(path)
}
// catch the url params
console.log(location.pathname);

  return (
    <div>
        <div>
        <div className="w-[100px] h-[96dvh] rounded-3xl bg-[#5F35F5]">
         <div className='flex justify-center items-center'>
         <div className='w-[70px] mt-10 h-[70px] rounded-full relative cursor-pointer group'>
            <picture>
              <img src="https://i.ibb.co.com/JRyz8B3Y/IMG-6210.jpg" alt="profile" className='w-full h-full object-cover rounded-full'/>
            </picture>
            <span className='absolute left-1/3 top-1/2 -translate-y-1/2 text-white text-2xl hidden group-hover:block'><IoCloudUploadOutline /></span>
            {/* Navigation icon */}
          </div>
        </div>
          <div className='flex flex-col items-center gap-y-10 justify-center mt-10'>
               {
                navigation.map((item, index)=>(
                  navigation.length -1 == index ? (<div onClick={()=>handleIcon(item.path)} className={location.pathname == item.path ? 'text-white active mt-12 text-[50px] cursor-pointer' :'text-white active mt-12 text-[50px] cursor-pointer' }key={item.icon}>{item.icon}
                  
            </div>) :
             (<div onClick={()=>handleIcon(item.path)} className={location.pathname == item.path ? 'text-white active mt-12 text-[50px] cursor-pointer' :'text-white mt-12 text-[50px] cursor-pointer' } key={item.icon}>{item.icon}
             
              </div>)
                  
                ))
               }
          <div>
            
          </div>

         </div>  
         </div>
        </div>
    </div>
  )
}

export default Sidebar