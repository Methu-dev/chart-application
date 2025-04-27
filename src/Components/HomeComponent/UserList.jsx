import React, { use, useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Avatar from "../../assets/avatar/home-icon.gif";
import { FaMinus, FaPlus } from "react-icons/fa";
import { getDatabase, ref, onValue, set, push, off } from "firebase/database";
import { getAuth } from "firebase/auth";
import lib from "../../lib/lib";
function UserList() {
  const db = getDatabase();
  const auth = getAuth();
  const [currentUser, serCurrentUser] = useState({});
  const [userlist, setUserlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [FriendRequest, setFriendRequest] = useState([]);

  useEffect(() => {
    const userRef = ref(db, "users");
    const unsubscribe = onValue(userRef, (snapshot) => {
      let users = [];
      snapshot.forEach((user) => {
        if (auth.currentUser?.uid !== user.val().userid) {
          users.push({ ...user.val(), userkey: user.key });
        } else {
          serCurrentUser({ ...user.val(), userkey: user.key });
        }
      });
      setUserlist(users);
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup function
  }, []);

  //fetch data from frendRequest
  useEffect(() => {
    const FrRRef = ref(db, "FriendRequest");
    onValue(FrRRef, (snapshot) => {
      const FrBlankArr = [];
      snapshot.forEach((FrR) => {
        if (auth.currentUser.uid == FrR.val().whoSendFrUid)
          FrBlankArr.push(
            auth?.currentUser?.uid?.concat(FrR.val()?.whoRVfrUid)
          );
      });
      setFriendRequest(FrBlankArr);
    });

    // cleanup function
    return () => {
      off(FrRRef);
    };
  }, []);
  //handleFriendRequest function
  const handleFriendRequest = (user) => {
    set(push(ref(db, "FriendRequest")), {
      whoSendFrdName: currentUser?.username || auth?.currentUser?.displayName,
      whoSendFrUid: currentUser?.userid || auth?.currentUser?.uid,
      whoSendFRemail: currentUser?.userid || auth?.currentUser?.email,
      whoSendFrprofile_picture:
        currentUser?.profile_picture || auth?.currentUser?.photoURL,
      whoSendFRUserrKey: user?.userkey || "",
      whoRVFrname: user?.username || "",
      whoRVfrUid: user?.userid || "",
      whoRVfrUserKey: user?.userkey || "",
      whoRVfrProfile_picture: user?.profile_picture || "",
      whoRVfremail: user?.email || "",
      createdAt: lib.getTimeNow(),
    })
      .then(() => {
        set(push(ref(db, "notification/")), {
          notificationMsg: `${
            currentUser?.username || auth?.currentUser?.displayName
          } Send a Friend Request ${user.username}`,
          createdAt: lib.getTimeNow(),
        });
      })
      .then(() => {
        lib.SucessToast(
          `${
            currentUser?.username || auth?.currentUser?.displayName
          } Send a Friend Request Sucessfuly done ${user.username}`
        );
      })
      .then(() => {
        console.log("hi");

        // const SenderIdReciverid = {
        //   id: currentUser?.userid + user?.userid
        // }
        // localStorage.setItem('sendFR', JSON.stringify(SenderIdReciverid))
      })
      .catch((err) => {
        console.error("error from friendRequest", err);
      });
  };

  //get data from localStorage
  const frdata = localStorage.getItem("sendFR");
  const senderRecivedId = JSON.parse(frdata);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between pt-6">
        <h1 className="relative">
          User List
          <span className="absolute right-[-28px] top-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-300 text-xs">
            {userlist.length}
          </span>
        </h1>
        <HiOutlineDotsVertical />
      </div>

      {/* Body */}
      <div className="overflow-y-scroll h-[50dvh] scrollbar mt-4">
        {loading
          ? [...Array(5)].map((_, index) => (
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
          : // ✅ Actual User List
            userlist.map((user, index) => (
              <div
                key={user.userkey}
                className={`flex items-center justify-between pt-3 pb-2 border-b ${
                  userlist.length - 1 === index ? "" : "border-b-[#000000]"
                }`}
              >
                <div className="w-[50px] h-[50px]">
                  <img
                    src={user.profile_picture || Avatar}
                    alt="Profile"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-[18px] font-semibold">{user.username}</h1>
                  <p className="text-sm">{user.email || "missing"}</p>
                </div>
                {FriendRequest?.includes(
                  auth?.currentUser?.uid + user.userid
                ) ? (
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
                  >
                    <FaMinus />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleFriendRequest(user)}
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
                  >
                    <FaPlus />
                  </button>
                )}
              </div>
            ))}
      </div>
    </div>
  );
}

export default UserList;
