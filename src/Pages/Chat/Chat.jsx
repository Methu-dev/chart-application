import React, { useState } from "react";
import Group from "../../Components/HomeComponent/Group";
import Friends from "../../Components/HomeComponent/Friends";
import { HiOutlineDotsVertical } from "react-icons/hi";

function Chat() {
  const [selectedFriend, setSelectedFriend] = useState(null);

  return (
    <div className="w-full bg-amber-200 h-[95dvh]">
      <div className="flex h-full">
        <div className="w-[40%] bg-blue-300 h-full">
          <Friends onFriendSelect={setSelectedFriend} />
        </div>

        <div className="w-[60%] bg-green-300 h-full p-7">
          {selectedFriend ? (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-x-3">
                  <div className="w-[70px] h-[70px] rounded-full">
                    <img
                      src={selectedFriend.whoSendFrprofile_picture}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h1 className="font-bold">
                      {selectedFriend.whoSendFrdName}
                    </h1>
                    <span className="text-sm text-green-800">Online</span>
                  </div>
                </div>
                <span>
                  <HiOutlineDotsVertical />
                </span>
              </div>

              {/* Chat body */}
              <div className="flex-1 bg-white rounded p-4 overflow-y-auto">
                {/* Messages will go here */}
                <p className="text-center text-gray-400">
                  Start your conversation with {selectedFriend.whoSendFrdName}
                </p>
              </div>

              {/* Input box */}
              <div className="mt-4">
                <input
                  type="text"
                  className="w-full p-2 rounded border border-gray-300"
                  placeholder={`Message ${selectedFriend.whoSendFrdName}...`}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-lg">
              Select a friend to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
