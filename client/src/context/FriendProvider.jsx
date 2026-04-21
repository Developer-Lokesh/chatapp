import React, { createContext, useEffect, useState } from 'react'

export const FriendContext = createContext();
const FriendProvider = ({children}) => {
    const [friendInfo, setFrientInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = import.meta.env.VITE_SERVER_URL;
                const res = await fetch(`${url}/user/friends/`, {
                    method:"GET",
                    credentials:"include"
                })
                const data = await res.json();
                console.log(data)
                if(data.success){
                    setFrientInfo(data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])
  return (
    <FriendContext.Provider value={{friendInfo, setFrientInfo}}>{children}</FriendContext.Provider>
  )
}

export default FriendProvider