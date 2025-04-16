import React from "react";
import Group from "../../Components/HomeComponent/Group";
import Friends from "../../Components/HomeComponent/Friends";
import { HiOutlineDotsVertical } from "react-icons/hi";

function Chat() {
  return (
    <div className="w-full bg-amber-200 h-[95dvh]">
      <div className="flex h-full">
        <div className="w-[40%] bg-blue-300 h-full">
          <Group />
          <Friends />
        </div>
        <div className="w-[60%] bg-green-300 h-full p-7">
         <div className="flex justify-between items-center">
         <div className="flex items-center gap-x-3">
            <div className="w-[70px] h-[70px] rounded-full">
              <picture>
                <img
                  src="https://images.pexels.com/photos/1931143/pexels-photo-1931143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="cover pic"
                  className="w-full h-full object-cover rounded-full"
                />
              </picture>
            </div>
            <div>
              <h1>Swathi</h1>
              <span>Online</span>
            </div>
          </div>
          <span>
            <HiOutlineDotsVertical />
          </span>
         </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
