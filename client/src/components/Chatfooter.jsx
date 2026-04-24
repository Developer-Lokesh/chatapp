import { LucideSendHorizontal } from "lucide-react";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { FriendContext } from "../context/FriendProvider";
import { MessageContext } from "../context/MessageProvider";
import { SocketContext } from "../context/SocketProvider";


const Chatfooter = () => {
  const { selectedFriend } = useContext(FriendContext);
  const {socket} = useContext(SocketContext)
  const { setMessages } = useContext(MessageContext);
  // console.log(selectedFriend, selectedFriend.id, "in Chatfooter");

  
  
  const receiverId = selectedFriend.id;
  const [input, setInput] = useState("");
  // console.log(input);
  const currentId = localStorage.getItem("id");

  const sendMessageBtn = async () => {
    if (!input.trim()) return;
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${url}/user/message/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ message: input, receiverId: receiverId }),
      });

      const data = await res.json();
      console.log(data, "this is data");
      if (data.success) {
        const newMessage = {
          id: data.data, 
          senderId: currentId,
          receiverId: selectedFriend.id,
          message: input, 
          create_At: new Date().toISOString(), 
        };
        socket.emit("send_message", newMessage)
        setMessages((prev) => [...prev, newMessage]);
        setInput("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 border-t h-18 bg-[#0a0a0c]  border-gray-700 flex gap-2">
      <input
        type="text"
        // name="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
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
