import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()
const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(null);
    // console.log(userInfo)
    const id = localStorage.getItem("id")
    useEffect(() => {
        const fetchData = async () => {
            if(!id) return;
            try {
                const url = import.meta.env.VITE_SERVER_URL;
                const res = await fetch(`${url}/user/me/`, {
                    method:"GET",
                    credentials:"include"
                });
                const data = await res.json();
                // console.log(data, "lokesh")
                if(data.success){
                    setUserInfo(data.data)
                }
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, [id]);
  return (
    <AuthContext.Provider value={{userInfo, setUserInfo}}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider;