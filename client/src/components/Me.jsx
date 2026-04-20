import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Me = () => {
    const {userInfo} = useContext(AuthContext);
    console.log(userInfo, "this is user info");
  return (
    <div className="overflow-hidden">
      <p className="text-sm font-bold text-gray-800 truncate">{userInfo?.[0]?.fullName}</p>
      <p className="text-xs text-gray-500 truncate">{userInfo?.[0]?.email}</p>
    </div>
  );
};

export default Me;
