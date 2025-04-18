import React, { use, useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Avatar from "../../assets/avatar/home-icon.gif";
import { FaPlus } from "react-icons/fa";
import { getDatabase, ref, onValue } from "firebase/database";

function UserList() {
  const db = getDatabase();
  const [arrlenght, setArrLenght] = useState(10);
  const [userlist, setUserlist] = useState([])
  useEffect(()=>{
    const userRef = ref(db, 'users');
    let userBlankArr = []
onValue(userRef, (snapshot) => {
  snapshot.forEach((user)=>{
    userBlankArr.push({...user.val(), userkey: user.key})
    
  })
  setUserlist(userBlankArr)
});
//cleanup funtion
return () => {
  const userRef = ref(db, 'users');
}
  }, [])
  console.log(userlist);
  
  return (
    <div>
      {/* Grouplist */}
      <div className="flex items-center justify-between pt-6">
        <h1 className="relative">
        User List
          <span className="absolute right-[-28px] top-0 flex items-center w-5 h-5 rounded-full bg-green-300">
            {arrlenght}
          </span>
        </h1>
        <span>
          <HiOutlineDotsVertical />
        </span>
      </div>
      <div className="overflow-y-scroll h-[50dvh] scrollbar ">
        {userlist?.map((user, index) => (
          <div
            className={
              arrlenght - 1 === index
                ? "flex items-center justify-between pt-3 border-b-[#000000] pb-2"
                : "flex items-center justify-between pt-3 border-b border-b-[#000000] pb-2"
            }
          >
            <div className="w-[50px] h-[50px]">
              <picture>
                <img
                  src={Avatar}
                  alt={Avatar}
                  className="w-full h-full rounded-full"
                />
              </picture>
            </div>
            <div className="">
              <h1 className="text-[18px] font-semibold">Raghav</h1>
              <p className="text-sm ">Today, 8:56pm</p>
            </div>
            <button
              type="button"
              class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
            >
              <span className="text-white"><FaPlus />
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;