import React from "react";
import Messages from "./Messages";
import Chatfooter from "./Chatfooter";
import ChatHeader from "./ChatHeader";

const ChatScreen = () => {
  return (
    <div className="h-screen flex flex-col bg-[#020617] text-white">
        <div>
            <ChatHeader/>
        </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-scroll hide-scrollbar p-4 pb-20">
        <Messages />
        <Messages />
       
      </div>

      {/* Footer (no sticky needed) */}
      <div className="bg-[#020617] border-t border-gray-700">
        <Chatfooter />
      </div>

    </div>
  );
};

export default ChatScreen;