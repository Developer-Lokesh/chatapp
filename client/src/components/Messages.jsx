import React, { useEffect, useRef, useContext, useState } from "react";
import { FriendContext } from "../context/FriendProvider";
import Chatfooter from "./Chatfooter";
import { MessageContext } from "../context/MessageProvider";
import { SocketContext } from "../context/SocketProvider";
import { Check, CheckCheck } from "lucide-react";

const Messages = () => {
  const { selectedFriend } = useContext(FriendContext);
  const { socket, typing } = useContext(SocketContext);
  const { messages } = useContext(MessageContext);

  const currentId = localStorage.getItem("id");

  const bottomRef = useRef(null);

  const isTyping = typing[String(selectedFriend?.id)];

  const [localTyping, setLocalTyping] = useState(false);

  useEffect(() => {
    if (selectedFriend?.id) {
      setLocalTyping(isTyping);
    }
  }, [typing, selectedFriend]);

  // Auto scroll
  useEffect(() => {
    if (messages.length > 0) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  // Seen emit
  useEffect(() => {
    if (!selectedFriend?.id) return;

    messages.forEach((msg) => {
      const isReceiverMessage = msg.senderId == selectedFriend.id;
      const isUnseen = msg.status !== "seen";

      if (isReceiverMessage && isUnseen) {
        socket.emit("message_seen", {
          messageId: msg.id,
          senderId: msg.senderId,
        });
      }
    });
  }, [messages, selectedFriend]);

  return (
    <div className="space-y-3 relative p-4 bg-[#0a0a0c] text-white pb-20">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.senderId == currentId ? "justify-end" : ""
          }`}
        >
          <div
            className={`px-4 py-2 rounded-2xl max-w-xs ${
              msg.senderId == currentId
                ? "bg-[#2563eb] text-white rounded-tr-none shadow-md"
                : "bg-[#1f2937] text-gray-200 rounded-tl-none"
            }`}
          >
            <p>{msg.message}</p>

            <div className="flex items-center justify-end gap-1 mt-1">
              <p className="text-[12px] text-gray-300">
                {new Date(msg.create_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              {/* only sender can see ticks */}
              {msg.senderId == currentId && (
                <span>
                  {msg.status === "seen" ? (
                    <CheckCheck width={14} height={14} />
                  ) : (
                    <Check width={14} height={14} />
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}

      <p className={`${localTyping ? "animate-bounce" : ""} text-gray-400`}>
        {localTyping ? "typing..." : ""}
      </p>

      <div ref={bottomRef}></div>
    </div>
  );
};

export default Messages;