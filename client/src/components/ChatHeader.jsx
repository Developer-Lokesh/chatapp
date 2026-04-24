import React from "react";
import { useContext } from "react";
import { FriendContext } from "../context/FriendProvider";
import { X } from "lucide-react";

const ChatHeader = () => {
  const { selectedFriend } = useContext(FriendContext);
  return (
    <div className="flex relative items-center h-15 bg-[#0a0a0c] px-10 gap-5 border-b-2 border-gray-700">
      <div className="flex gap-4">
        <img
          src={selectedFriend?.profileImageUrl}
          alt="User Image"
          className="w-10 h-10 rounded-full"
        />
        <span>
          <p>{selectedFriend?.fullName}</p>
          <p className="text-gray-400">Online</p>
        </span>
      </div>

      <button className="hidden sm:absolute right-2 top-0" >
        <X/>
      </button>
    </div>
  );
};

export default ChatHeader;
