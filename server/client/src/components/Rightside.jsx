import React, { useContext, useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatScreen from "./ChatScreen";
import { FriendContext } from "../context/FriendProvider";
import { SocketContext } from "../context/SocketProvider";

const Rightside = () => {
  const {
    selectedFriend,
    setSelectedFriend,
  } = useContext(FriendContext);

  const { typing, onlineUsers } =
    useContext(SocketContext);

  const isOnline = onlineUsers.includes(
    selectedFriend?.id
  );

  const isTyping =
    typing[String(selectedFriend?.id)];

  const [localTyping, setLocalTyping] =
    useState(false);

  useEffect(() => {
    if (selectedFriend?.id) {
      setLocalTyping(isTyping);
    }
  }, [typing, selectedFriend]);

  // Mobile close
  const closeMobileChat = () => {
    setSelectedFriend(null);
  };

  return (
    <>
      {/* DESKTOP */}

      <div className="hidden sm:flex sm:w-[70%] lg:w-[65%] bg-[#020617] overflow-hidden h-screen border-l border-gray-700">

        {selectedFriend ? (
          <div className="w-full h-full flex flex-col">
            <ChatScreen />
          </div>
        ) : (
          <div className="flex w-full flex-col items-center justify-center h-screen text-white bg-[#0a0a0c]">

            <div className="p-5 rounded-full bg-white/10 backdrop-blur-md shadow-lg animate-bounce">
              <MessageCircle size={40} />
            </div>

            <h1 className="mt-6 text-2xl font-semibold tracking-wide">
              Start a Conversation
            </h1>

            <p className="mt-2 text-gray-400 text-center max-w-sm">
              Select a user from the sidebar
              and start chatting instantly.
            </p>
          </div>
        )}
      </div>

      {/* MOBILE CHAT */}

      {selectedFriend && (
        <div className="sm:hidden fixed inset-0 z-50 bg-[#020617] flex flex-col">

          {/* HEADER */}

          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-[#0a0a0c]">

            <div className="flex items-center space-x-3">

              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={
                    selectedFriend?.profileImageUrl
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-white font-semibold text-lg">
                  {selectedFriend?.fullName ||
                    "Unknown"}
                </h2>

                {localTyping ? (
                  <p className="text-gray-400 text-sm">
                    typing...
                  </p>
                ) : (
                  <p className="text-gray-400 text-sm">
                    {isOnline
                      ? "Online"
                      : "Offline"}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={closeMobileChat}
              className="p-2 rounded-full hover:bg-white/10 transition-all"
            >
              <X
                size={24}
                className="text-gray-400"
              />
            </button>
          </div>

          {/* CHAT SCREEN */}

          <div className="flex-1 overflow-hidden">
            <ChatScreen />
          </div>
        </div>
      )}
    </>
  );
};

export default Rightside;