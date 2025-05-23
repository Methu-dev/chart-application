// Friends.jsx
import React, { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Avatar from "../../assets/avatar/home-icon.gif";
import { getDatabase, ref, onValue, push, remove, off } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";
import lib from "../../lib/lib";

function Friends({ onFriendSelect }) {
  const [friends, setFriends] = useState([]);
  const db = getDatabase();
  const auth = getAuth();
  const [active, setactive] = useState(false);
  const [blockUser, setblockUser] = useState([]);

  useEffect(() => {
    const frRef = ref(db, "Friends/");
    const unsubscribe = onValue(frRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        const data = item.val();
        if (
          data.whoRVfrUid === auth.currentUser?.uid ||
          data.whoSendFrdUid === auth.currentUser?.uid
        ) {
          arr.push({ ...data, id: item.key });
        }
      });
      setFriends(arr);
    });

    return () => unsubscribe();
  }, []);

  // fetch block data
  useEffect(() => {
    const FrRRef = ref(db, "blocklist");
    onValue(FrRRef, (snapshot) => {
      const blockBlankArr = [];
      snapshot.forEach((block) => {
       if(auth?.currentUser?.uid == block.val().whoRVfrUid){
        blockBlankArr.push(auth.currentUser.uid.concat(block.val().whoSendFrUid
      ));
       }
        
      });
      setblockUser(blockBlankArr);
    });

    // cleanup function
    return () => {
      off(FrRRef);
    };
  }, []);
  

  // handleBlock function
  const handleBlock = (frInfo = {}) => {

    push(ref(db, "blocklist/"), {
      ...frInfo,
      createdAt: lib.getTimeNow(),
    })
      .then(() => {
        lib.SucessToast(`${frInfo.whoSendFrdName} has been blocked.`);
      }).then(() => {
        const friendRef = ref(db, `Friends/${frInfo.id}`);
        remove(friendRef);
      })
      
      .catch((error) => {
        console.error("Block Error:", error);
      });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between pt-6">
        <h1 className="relative font-bold text-lg">
          Friends
          <span className="absolute -right-7 top-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-300 text-xs">
            {friends.length}
          </span>
        </h1>
        <span>
          <HiOutlineDotsVertical />
        </span>
      </div>

      {/* Friends list */}
      <div className="overflow-y-scroll h-[50dvh] scrollbar mt-4 pr-2">
        {friends.length === 0 ? (
          <p className="text-center mt-5 text-gray-400">No friends yet.</p>
        ) : (
          friends.map((item, index) => (
            <div
              key={item.id}
              className={`flex items-center justify-between pt-3 pb-2 border-b ${
                friends.length - 1 === index ? "" : "border-b-[#000000]"
              }`}
            >
              <div className="w-[50px] h-[50px]">
                <img
                  src={item.whoSendFrprofile_picture || Avatar}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex-1 ml-3">
                <h1 className="text-[18px] font-semibold">
                  {item.whoSendFrdName}
                </h1>
                <p className="text-sm text-gray-600">
                  {moment(item.createdAt).fromNow()}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  className="bg-blue-600 text-white px-3 py-1 cursor-pointer rounded hover:bg-blue-700 text-sm"
                  onClick={() => handleUnfriend(item)}
                >
                  Unfriend
                </button>

                {blockUser.includes(
                  auth.currentUser.uid.concat(item.whoSendFrUid)
                ) ? (
                  <button
                    className="bg-gray-400 text-white px-3 py-1 cursor-not-allowed rounded text-sm"
                    disabled
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    className="bg-red-600 text-white px-3 py-1 cursor-pointer rounded hover:bg-red-700 text-sm"
                    onClick={() => handleBlock(item)}
                  >
                    Block
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Friends;
