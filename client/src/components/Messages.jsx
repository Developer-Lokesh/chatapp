import React, { useEffect, useRef, useContext, useState } from "react";
import { FriendContext } from "../context/FriendProvider";
import { MessageContext } from "../context/MessageProvider";
import { SocketContext } from "../context/SocketProvider";
import { Check, CheckCheck } from "lucide-react";

const Messages = () => {
  const { selectedFriend } = useContext(FriendContext);
  const { socket, typing } = useContext(SocketContext);
  const { messages, setMessages } = useContext(MessageContext);
  // const count = {};

  // const unseenMessage = messages.filter((msg) => msg.status === 'sent');
  // console.log(unseenMessage, "this is unseen message")

  const currentId = localStorage.getItem("id");
  // const unreadMessages = messages.filter(
  //   (msg) =>
  //     Number(msg.receiverId) === Number(currentId) &&
  //     Number(msg.senderId) === Number(selectedFriend?.id) &&
  //     msg.status === "sent",
  // );

  // console.log(typeof currentId);
  // console.log(messages);

  // console.log(unreadMessages.length, unreadMessages, "this is unread message");
  const bottomRef = useRef(null);

  // Is ref ka use hum emit track karne ke liye karenge taaki infinite loop na bane
  const processedMessages = useRef(new Set());

  const isTyping = typing[String(selectedFriend?.id)];
  const [localTyping, setLocalTyping] = useState(false);

  useEffect(() => {
    if (selectedFriend?.id) {
      setLocalTyping(isTyping);
    }
  }, [typing, selectedFriend]);

  // Auto scroll logic
  useEffect(() => {
    if (messages.length > 0) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  // Fixed Seen Emit Logic (No more infinite loops)
  useEffect(() => {
    if (!selectedFriend?.id || !socket) return;

    messages.forEach((msg) => {
      const isReceiverMessage =
        Number(msg.senderId) === Number(selectedFriend.id);
      const isUnseen = msg.status !== "seen";

      // Sirf tab emit karo agar message hamne abhi tak process nahi kiya hai
      if (
        isReceiverMessage &&
        isUnseen &&
        !processedMessages.current.has(msg.id)
      ) {
        socket.emit("message_seen", {
          messageId: msg.id,
          senderId: msg.senderId,
        });

        // Mark as processed taaki state update hone par dubara emit na ho
        processedMessages.current.add(msg.id);
      }
    });
  }, [messages, selectedFriend, socket]);

  //  Optimized Socket Listener
  useEffect(() => {
    if (!socket) return;

    const handleSeen = ({ messageId }) => {
      console.log("SEEN EVENT RECEIVED", messageId);
      setMessages((prev) =>
        prev.map((msg) =>
          Number(msg.id) === Number(messageId) && msg.status !== "seen"
            ? { ...msg, status: "seen" }
            : msg,
        ),
      );
    };

    socket.on("message_seen", handleSeen);

    return () => {
      socket.off("message_seen", handleSeen);
    };
  }, [socket, setMessages]);

  return (
    <div className="space-y-3 relative p-4 bg-[#0a0a0c] text-white pb-20">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex relative ${
            Number(msg.senderId) === Number(currentId) ? "justify-end" : ""
          }`}
        >
          <div
            className={`px-4 py-2 rounded-2xl max-w-xs ${
              Number(msg.senderId) === Number(currentId)
                ? "bg-[#2563eb] text-white mb-3 rounded-tr-none shadow-md"
                : "bg-[#1f2937] text-gray-200 rounded-tl-none mb-3"
            }`}
          >
            <p className="break-all">{msg.message}</p>

            <div className="flex items-center justify-end gap-1 mt-1">
              <p className="text-[12px] text-gray-300">
                {new Date(msg.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              {/* Ticks logic */}
              {Number(msg.senderId) === Number(currentId) && (
                <span className="ml-1">
                  {msg.status === "seen" ? (
                    <CheckCheck width={14} height={14} className="text-white" />
                  ) : (
                    <Check width={14} height={14} className="text-gray-400" />
                  )}
                </span>
              )}
            </div>
          </div>
          <p className="text-[12px] text-gray-300 absolute bottom-[-10px] ">
            {new Date(msg.created_at).toLocaleString([], {
              day: "2-digit",
              month: "short",
              year: "numeric",
              // hour: "2-digit",
              // minute: "2-digit",
            })}
          </p>
        </div>
      ))}

      {localTyping && (
        <p className="animate-bounce text-gray-400 text-sm">typing...</p>
      )}

      <div ref={bottomRef}></div>
    </div>
  );
};

export default Messages;
