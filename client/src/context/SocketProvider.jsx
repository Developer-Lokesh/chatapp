import React, { createContext, useEffect, useState } from "react";
import { useRef } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [typing, setTyping] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);
  const id = localStorage.getItem("id");
  const url = import.meta.env.VITE_SERVER_URL;

  const typingTimeouts = useRef({});

  useEffect(() => {
    if (!url) return;
    const newSocket = io(`${url}`, {
      withCredentials: true,
    });
    setSocket(newSocket);

    const handleTyping = ({ senderId }) => {
      console.log("Typing start for:", senderId);
      setTyping((prev) => ({ ...prev, [String(senderId)]: true }));

      // clear previous timeout for this user
      if (typingTimeouts.current[senderId]) {
        clearTimeout(typingTimeouts.current[senderId]);
      }

      // set new timeout
      typingTimeouts.current[senderId] = setTimeout(() => {
        setTyping((prev) => ({ ...prev, [senderId]: false }));
      }, 2000);
    };

    const handleStopTyping = ({ senderId }) => {
      console.log("Typing stop for:", senderId);
      setTyping((prev) => ({ ...prev, [String(senderId)]: false }));
    };

    const handleOnlineUsers = (users) => {
      console.log("online users", users);

      setOnlineUsers(users);
    };

    newSocket.on("getOnlineUsers", handleOnlineUsers);
    newSocket.on("typing", handleTyping);
    newSocket.on("stopTyping", handleStopTyping);

    return () => {
      newSocket.off("typing", handleTyping);
      newSocket.off("stopTyping", handleStopTyping);
      newSocket.off("getOnlineUsers", handleOnlineUsers);
      newSocket.disconnect();
    };
  }, [url]);
  return (
    <SocketContext.Provider value={{ socket, typing, onlineUsers, }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
