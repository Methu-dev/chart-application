import React, { useEffect } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { IoCloudUploadOutline, IoHomeOutline, IoSettingsOutline } from 'react-icons/io5'
import { LuMessageCircleMore } from 'react-icons/lu'
import { MdLogout } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router'

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const navigation = [
    { icon: <IoHomeOutline />, path: "/" },
    { icon: <LuMessageCircleMore />, path: "/message" },
    { icon: <IoMdNotificationsOutline />, path: "/notification" },
    { icon: <IoSettingsOutline />, path: "/setting" },
  ]

  const logoutIcon = <MdLogout />

  const handleNavigation = (path) => {
    navigate(path)
  }

  const handleLogout = () => {
    console.log("Logout clicked")
  }
useEffect(() =>{
  const scrict = document.createElement("script");
  scrict.src = "https://upload-widget.cloudinary.com/latest/global/all.js"
  scrict.async = true;
  console.log(scrict);
  document.body.appendChild(scrict);
},[]);

const handleProfileBtn = ()=>{
  if(window.cloudinary){
    cloudinary.openUploadWidget({
      cloudName: "dmlou4zwt",
      uploadPreset: "chat-application",
      googleApiKey: 'AIzaSyCPvL3aA1lPeO_VKYFl7fTxhPEJnlGkg9Q',
      searchBySites: ["all", "cloudinary.com"],
      searchByRights: true,
      sources: [ 'local', 'url', 'camera', 'dropbox', 'image_search', 'shutterstock', 'istock', 'unsplash', 'google_drive'],
    },(error, result) => {
      if(error){
        throw new Error("coudinary profile picture upload error")
      }
      console.log(result.data);
      
    })
  }else{
    throw new Error("upload faild")
  }
}

  return (
    <div className="w-[100px] h-[96dvh] rounded-3xl bg-[#5F35F5] flex flex-col justify-between items-center py-10">

      {/* Profile Image */}
      <div className='w-[70px] h-[70px] rounded-full relative cursor-pointer group'>
        <img
          src="https://i.ibb.co.com/JRyz8B3Y/IMG-6210.jpg"
          alt="profile"
          className='w-full h-full object-cover rounded-full'
        />
        <span onClick={handleProfileBtn} className='absolute left-1/3 top-1/2 -translate-y-1/2 text-white text-2xl hidden group-hover:block'>
          <IoCloudUploadOutline />
        </span>
      </div>

      {/* Navigation Icons with big active highlight */}
      <div className='flex flex-col items-center gap-y-8 mt-10'>
        {navigation.map((item, index) => {
          const isActive = location.pathname === item.path
          return (
            <div
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`relative w-[70px] h-[70px] flex items-center justify-center rounded-2xl cursor-pointer transition-all duration-300
              ${isActive ? 'bg-white text-[#5F35F5] shadow-lg scale-110' : 'text-white/60 hover:text-white'}`}
            >
              <div className="text-[32px]">
                {item.icon}
              </div>
            </div>
          )
        })}
      </div>

      {/* Logout Button */}
      <div
        onClick={handleLogout}
        className="text-white text-[40px] cursor-pointer mb-4 hover:text-red-300 transition-colors duration-300"
      >
        {logoutIcon}
      </div>
    </div>
  )
}

export default Sidebar
