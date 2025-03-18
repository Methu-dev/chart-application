import React from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { IoCloudUploadOutline, IoHomeOutline, IoSettingsOutline } from 'react-icons/io5'
import { LuMessageCircleMore } from 'react-icons/lu'
import { MdLogout } from 'react-icons/md'

function Sidebar() {
  const navigation = [
    {
      id: 1,
      icon: <IoHomeOutline />
    },

    {
      id: 2,
      icon: <LuMessageCircleMore />
    },

    {
      id: 3,
      icon: <IoMdNotificationsOutline />

    },

    {
      id: 4,
      icon: <IoSettingsOutline />
    },

    {
      id: 5,
      icon: <MdLogout />
    },
  ]
  return (
    <div>
        <div>
        <div className="w-[10%] h-[93vh] rounded-2xl bg-[#5F35F5]">
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
                navigation.map((item)=>(
                  <span className='text-white text-[50px]'key={item.icon}>{item.icon}
            </span>
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