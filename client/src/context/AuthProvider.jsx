import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()
const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = import.meta.env.VITE_SERVER_URL;
                const res = await fetch(`${url}/user/me/`, {
                    method:"GET",
                    credentials:"include"
                });
                const data = await res.json();
                console.log(data)
                if(data.success){
                    setUserInfo(data.data)
                }
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, []);
  return (
    <AuthContext.Provider value={{userInfo, setUserInfo}}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider;