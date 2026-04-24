import React, { createContext, useContext, useState, useEffect } from "react";
import { FriendContext } from "./FriendProvider";
import { SocketContext } from "./SocketProvider"; 

export const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const { selectedFriend } = useContext(FriendContext);
  const { socket } = useContext(SocketContext); 
  const currentUserId = localStorage.getItem("id")

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedFriend?.id) return;
      try {
        const url = import.meta.env.VITE_SERVER_URL;
        const res = await fetch(`${url}/user/message/${selectedFriend?.id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setMessages(data.data);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [selectedFriend?.id]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      console.log("Message received via socket:", newMessage);

      if (String(newMessage.senderId) === String(currentUserId)) {
        return;
      }
      

      const isRelevant = String(newMessage.senderId) === String(selectedFriend?.id) || 
                         String(newMessage.receiverId) === String(selectedFriend?.id);

      if (isRelevant) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("receive_message", handleNewMessage);

    return () => {
      socket.off("receive_message", handleNewMessage);
    };
  }, [socket, selectedFriend?.id]);

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;