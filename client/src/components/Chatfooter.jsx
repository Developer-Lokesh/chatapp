import { LucideSendHorizontal } from "lucide-react";
import React, { useRef, useContext, useState } from "react";

import { FriendContext } from "../context/FriendProvider";
import { MessageContext } from "../context/MessageProvider";
import { SocketContext } from "../context/SocketProvider";

const Chatfooter = () => {
  const { selectedFriend } = useContext(FriendContext);

  const { socket } = useContext(SocketContext);

  const { setMessages } = useContext(MessageContext);

  const receiverId = selectedFriend?.id;

  const [input, setInput] = useState("");

  const currentId = localStorage.getItem("id");

  const typingTimeOut = useRef(null);

  const typingHandler = (e) => {
    setInput(e.target.value);

    if (!socket || !selectedFriend) return;

    socket.emit("typing", {
      senderId: currentId,
      receiverId,
    });

    clearTimeout(typingTimeOut.current);

    typingTimeOut.current = setTimeout(() => {
      socket.emit("stopTyping", {
        senderId: currentId,
        receiverId,
      });
    }, 1000);
  };

  const sendMessageBtn = async () => {
    if (!input.trim()) return;

    if (!socket) return;

    try {
      const url = import.meta.env.VITE_SERVER_URL;

      // DB save
      const res = await fetch(`${url}/user/message/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          message: input,
          receiverId,
        }),
      });

      const data = await res.json();

      if (data.success) {
        const newMessage = {
          id: data.data,
          senderId: currentId,
          receiverId,
          message: input,
          create_At: new Date().toISOString(),
        };

        // realtime emit
        socket.emit("send_message", newMessage);

        // local UI update
        setMessages((prev) => [...prev, newMessage]);

        setInput("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 border-t h-18 bg-[#0a0a0c] border-gray-700 flex gap-2">
      <input
        type="text"
        value={input}
        onChange={typingHandler}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            sendMessageBtn();
          }
        }}
        placeholder="Type message..."
        className="flex-1 px-4 py-2 rounded-full bg-[#1e293b] outline-none"
      />

      <button
        onClick={sendMessageBtn}
        className="bg-[#2563eb] text-white px-4 py-2 rounded-full cursor-pointer hover:bg-[#6294ff]"
      >
        <LucideSendHorizontal />
      </button>
    </div>
  );
};

export default Chatfooter;
