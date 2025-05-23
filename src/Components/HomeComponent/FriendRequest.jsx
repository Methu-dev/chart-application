import React, { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Avatar from "../../assets/avatar/home-icon.gif";
import { getDatabase, ref, onValue, push, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";
import lib from '../../lib/lib';



function FriendRequest() {
  const db = getDatabase();
  const auth = getAuth();
  const [frList, setFrList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const frRef = ref(db, "FriendRequest");
    const unsubscribe = onValue(frRef, (snapshot) => {
      const FrBlankArr = [];
      snapshot.forEach((item) => {
        const request = item.val();
        if (request.whoRVfrUid === auth.currentUser?.uid) {
          FrBlankArr.push({ ...request, id: item.key });
        }
      });
      setFrList(FrBlankArr);
      setLoading(false);
    });
  
    return () => unsubscribe(); // ✅ Proper cleanup
  }, []);
  
  // handleAcceptFriendRequest function
  const handleAcceptFriendRequest = (friendRIfo) => {
    const friendsRef = ref(db, "Friends/");
    const notificationRef = ref(db, "notification/");
    const requestRef = ref(db, `FriendRequest/${friendRIfo.id}`);
  
    // First: push to Friends
    push(friendsRef, {
      ...friendRIfo,
      createdAt: lib.getTimeNow(),
    })
      .then(() => {
        // Then: push to Notification
        return push(notificationRef, {
          notificationMsg: `${friendRIfo.whoSendFrdName} accepted your friend request.`,
          createdAt: lib.getTimeNow(),
        });
      })
      .then(() => {
        // Then: remove the request
        return remove(requestRef);
      })
      .then(() => {
        lib.SucessToast(`${friendRIfo.whoSendFrdName} added as friend`);
      })
      .catch((err) => {
        console.error("Error from accept friendRequest", err);
      });
  };
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between pt-6">
        <h1 className="relative font-bold text-lg">
          Friend Request
          <span className="absolute -right-7 top-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-300 text-xs">
            {frList.length}
          </span>
        </h1>
        <span>
          <HiOutlineDotsVertical />
        </span>
      </div>

      {/* Friend Request List */}
      <div className="overflow-y-scroll h-[50dvh] scrollbar mt-4 pr-2">
        {loading ? (
          // Skeleton loading
          [...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-gray-200 pb-3 pt-2 animate-pulse"
            >
              <div className="w-[50px] h-[50px] bg-gray-300 rounded-full"></div>
              <div className="flex-1 mx-4">
                <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-36 h-3 bg-gray-200 rounded"></div>
              </div>
              <div className="w-10 h-10 bg-green-200 rounded-lg"></div>
            </div>
          ))
        ) : frList.length === 0 ? (
          <p className="text-center mt-5 text-gray-400">No friend requests yet.</p>
        ) : (
          frList?.map((user, index) => (
            <div
              key={user.id}
              className={`flex items-center justify-between pt-3 pb-2 border-b ${
                frList.length - 1 === index ? "" : "border-b-[#000000]"
              }`}
            >
              <div className="w-[50px] h-[50px]">
                <img
                  src={user.whoSendFrprofile_picture || Avatar}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex-1 ml-3">
                <h1 className="text-[18px] font-semibold">
                  {user.whoSendFrdName}
                </h1>
                <p className="text-sm text-gray-600">
                  {moment(user.createdAt).fromNow()}
                </p>
              </div>
              <div>
              <button
                type="button"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"onClick={()=>handleAcceptFriendRequest(user)}

              >
                Accept
              </button>
              <button
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
              >
                Reject
              </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FriendRequest;
