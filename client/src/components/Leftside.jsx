import React from "react";
import SearchBar from "./SearchBar";
import Usersection from "./Usersection";
import Header from "./Header";

const Leftside = () => {
  return (
    <div className="w-full sm:w-[30%] h-screen flex flex-col bg-slate-800">

      {/* Header (Top fixed inside container) */}
      <div className="sticky top-0 z-30">
        <Header />
        <SearchBar />
        <div className=" px-10 text-gray-100 bg-slate-700">
          <h1 className="text-2xl font-bold italic">Messages</h1>
        </div>
      </div>

      {/* Scrollable User List */}
      <div className="flex-1 overflow-y-scroll hide-scrollbar">
        <Usersection />
      </div>

    </div>
  );
};

export default Leftside;