import React, { useContext, useEffect } from "react";
// import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  useEffect(() => {
    if (!id) {
      // console.log("please login first");
      navigate("/login")
      return;
    }
    // navigate('/')
  }, [id]);

  return id ?  children : null;
};

export default ProtectedRoute;
