import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { FriendContext } from "../context/FriendProvider";
import { X } from "lucide-react";
import { SocketContext } from "../context/SocketProvider";

const ChatHeader = () => {
  const { selectedFriend } = useContext(FriendContext);
  const { typing, onlineUsers } = useContext(SocketContext);
  const isOnline = onlineUsers.includes(selectedFriend?.id);
  // console.log(isOnline);
  // console.log(onlineUsers, "online user");
  const isTyping = typing[String(selectedFriend?.id)];


  const [localTyping, setLocalTyping] = useState(false);
  // const [open, setOpen] = useState(false);
  // console.log(localTyping);

  useEffect(() => {
    if (selectedFriend?.id) {
      setLocalTyping(isTyping);
    }
  }, [typing, selectedFriend]);

  return (
    <div className="hidden sm:flex relative items-center h-15 bg-[#0a0a0c] px-10 gap-5 border-b-2 border-gray-700">
      <div className="flex gap-4">
        <img
          src={selectedFriend?.profileImageUrl}
          alt="User Image"
          onClick={() => setOpen(true)}
          className="min-w-10 min-h-10 w-10 h-10 rounded-full object-cover cursor-pointer"
        />
        <span>
          <p>{selectedFriend?.fullName}</p>
          {localTyping ? (
            <p className="text-gray-400">typing...</p>
          ) : (
            <p className="text-gray-400">{isOnline ? "Online" : "Offline"}</p>
          )}
        </span>
      </div>

      <button className="hidden sm:absolute right-2 top-0">
        <X />
      </button>

      {/* {open ? (
        <div className="h-screen w-screen relative flex justify-center items-center bg-black/50">
          <div className="bg-amber-400 absolute">
            <img src={selectedFriend?.profileImageUrl} alt="User Image"
            className="" />
          </div>
        </div>
      ) : (
        ""
      )} */}
    </div>
  );
};

export default ChatHeader;
