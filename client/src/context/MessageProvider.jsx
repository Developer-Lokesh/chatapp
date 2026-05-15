import React, { createContext, useContext, useState, useEffect } from "react";
import { FriendContext } from "./FriendProvider";
import { SocketContext } from "./SocketProvider";

export const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const { selectedFriend } = useContext(FriendContext);

  const { socket, unreadCounts, setUnreadCounts } = useContext(SocketContext);
  // console.log(unreadCounts, "unread");

  const currentUserId = localStorage.getItem("id");

  // Fetch messages
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

        // console.log(data, "this is data");

        // if (data.success) {
        //   setMessages(data.data);

        // } else {
        //   setMessages([]);
        // }

        if (data.success) {
          setMessages(data.data);

          // unread count calculate
          const counts = {};

          data.data.forEach((msg) => {
            if (
              Number(msg.receiverId) === Number(currentUserId) &&
              msg.status === "sent"
            ) {
              counts[msg.senderId] = (counts[msg.senderId] || 0) + 1;
            }
          });

          setUnreadCounts(counts);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [selectedFriend?.id]);

  // Receive realtime messages
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      // console.log("Message received via socket:", newMessage);

      // apne khud ke message ignore
      if (String(newMessage.senderId) === String(currentUserId)) {
        return;
      }

      const isRelevant =
        String(newMessage.senderId) === String(selectedFriend?.id) ||
        String(newMessage.receiverId) === String(selectedFriend?.id);

      // open chat me message show karo
      if (isRelevant) {
        setMessages((prev) => [...prev, newMessage]);
      }

      // unread count increase
      if (String(newMessage.senderId) !== String(selectedFriend?.id)) {
        setUnreadCounts((prev) => ({
          ...prev,
          [newMessage.senderId]: (prev[newMessage.senderId] || 0) + 1,
        }));
      }
    };

    socket.on("receive_message", handleNewMessage);

    return () => {
      socket.off("receive_message", handleNewMessage);
    };
  }, [socket, selectedFriend?.id]);

  // find unread message 

  useEffect(() => {
    const fetchUnreadMessage = async () => {
      try {
        const url = import.meta.env.VITE_SERVER_URL;
        const unseenRes = await fetch(`${url}/user/message/`, {
          method:"GET",
          credentials:"include"
        });
        const unseenData = await unseenRes.json();
        // console.log(unseenData, "unseenData")
        if(unseenData.success){
          const unseenCount = {};
          unseenData.data.forEach((item) => {
            unseenCount[item.senderId] = item.unreadCount
          });

          setUnreadCounts(unseenCount)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchUnreadMessage();
  }, []);

  // Chat open hote hi unread reset
  useEffect(() => {
    if (!selectedFriend?.id) return;

    setUnreadCounts((prev) => ({
      ...prev,
      [String(selectedFriend.id)]: 0,
    }));
  }, [selectedFriend?.id]);

  return (
    <MessageContext.Provider
      value={{
        messages,
        setMessages,
        unreadCounts,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
