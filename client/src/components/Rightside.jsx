import React from "react";
import { MessageCircle, X } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatScreen from "./ChatScreen";
import Chatfooter from "./Chatfooter";
import { FriendContext } from "../context/FriendProvider";

const Rightside = () => {
  const { selectedFriend, setSelectedFriend  } = useContext(FriendContext);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  useEffect(() => {
    if (selectedFriend && window.innerWidth < 640) { 
      setIsMobileChatOpen(true);
    }
  }, [selectedFriend]);

  const closeMobileChat = () => {
    setIsMobileChatOpen(false);
    setSelectedFriend(null)
  };

  return (
    <>
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
              Select a user from the sidebar and start chatting instantly.
            </p>
          </div>
        )}
      </div>

      {isMobileChatOpen && (
        <div className="sm:hidden fixed inset-0 z-50 bg-[#020617] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-[#0a0a0c]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <img className="text-white font-semibold text-sm rounded-full"
                src={selectedFriend?.profileImageUrl}
                  
                />
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg">
                  {selectedFriend?.fullName || 'Unknown'}
                </h2>
                <p className="text-gray-400 text-sm">Online</p>
              </div>
            </div>
            
            <button
              onClick={closeMobileChat}
              className="p-2 rounded-full hover:bg-white/10 transition-all"
            >
              <X size={24} className="text-gray-400" />
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            <ChatScreen />
          </div>

        </div>
      )}

      {isMobileChatOpen && (
        <div 
          className= "sm:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm "
          onClick={closeMobileChat}
        />
      )}
    </>
  );
};

export default Rightside;
