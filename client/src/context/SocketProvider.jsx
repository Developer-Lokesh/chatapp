import React, { createContext, useEffect, useState } from 'react'
import {io} from "socket.io-client"

export const SocketContext = createContext();

const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const id = localStorage.getItem("id");
    const url = import.meta.env.VITE_SERVER_URL;

   
    

    useEffect(() => {
        const newSocket = io(`${url}`, {
            withCredentials:true,
            query:{id:id}
        });
        setSocket(newSocket);
        return () => {
            newSocket.disconnect()
        }
    },[id, url]);
  return (
    <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>
  )
}

export default SocketProvider