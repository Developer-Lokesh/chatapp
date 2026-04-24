import React, { useEffect, useRef } from "react";
import { useContext } from "react";
import { FriendContext } from "../context/FriendProvider";
import { useState } from "react";
import Chatfooter from "./Chatfooter";
import  { MessageContext } from "../context/MessageProvider";
import { SocketContext } from "../context/SocketProvider";

const Messages = () => {
  const { selectedFriend } = useContext(FriendContext);
  const {socket} = useContext(SocketContext)
  const {messages} = useContext(MessageContext)
  console.log(messages)
  const currentId = localStorage.getItem("id");

  const bottomRef = useRef(null);

  // Auto scroll to bottom

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
      <div className=" space-y-3 relative p-4 bg-[#0a0a0c] text-white pb-20">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.senderId == currentId ? "justify-end" : ""} `}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs ${
                msg.senderId == currentId
                  ? "bg-[#2563eb] text-white rounded-tr-none shadow-md"
                  : "bg-[#1f2937] text-gray-200 rounded-tl-none"
              }`}
            >
              <span>
                <p>{msg.message}</p>
                <p className="text-[12px] text-right text-gray-300">
                  {new Date(msg.create_At).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </span>
            </div>
          </div>
        ))}

        <div ref={bottomRef}></div>
        
      </div>
        
  );
};

export default Messages;
