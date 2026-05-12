import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthProvider';

export const FriendContext = createContext();
const FriendProvider = ({children}) => {
    const {userInfo} = useContext(AuthContext)
    const [friendInfo, setFrientInfo] = useState(null);
    const [selectedFriend, setSelectedFriend] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
             if (!userInfo) return;
            try {
                const url = import.meta.env.VITE_SERVER_URL;
                const res = await fetch(`${url}/user/friends/`, {
                    method:"GET",
                    credentials:"include"
                })
                const data = await res.json();
                // console.log(data)
                if(data.success){
                    setFrientInfo(data?.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [userInfo])
  return (
    <FriendContext.Provider value={{friendInfo, setFrientInfo, selectedFriend, setSelectedFriend}}>{children}</FriendContext.Provider>
  )
}

export default FriendProvider