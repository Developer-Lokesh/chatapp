// import React from "react";
// import SearchBar from "./SearchBar";
// import Usersection from "./Usersection";
// import Header from "./Header";

// const Leftside = () => {
//   return (
//     <div className="w-full sm:w-[30%] h-screen flex flex-col bg-[#0a0a0c]">

//       {/* Header (Top fixed inside container) */}
//       <div className="sticky top-0 z-30">
//         <Header />
//         <SearchBar />
//         <div className=" px-10 text-gray-100 bg-slate-700">
//           <h1 className="text-2xl font-bold italic">Messages</h1>
//         </div>
//       </div>

//       {/* Scrollable User List */}
//       <div className="flex-1 overflow-y-scroll hide-scrollbar">
//         <Usersection />
//       </div>

//     </div>
//   );
// };

// export default Leftside;


import React from "react";
import SearchBar from "./SearchBar";
import Usersection from "./Usersection";
import Header from "./Header";

const Leftside = () => {
  return (
    <div className="w-full sm:w-[30%] lg:w-[35%] h-screen flex flex-col bg-[#0a0a0c] fixed sm:static left-0 top-0 z-40 sm:z-auto">
      
      {/* Header (Top fixed inside container) */}
      <div className="sticky top-0 z-30 bg-[#0a0a0c] sm:bg-transparent">
        <Header />
        <SearchBar />
        <div className="px-4 sm:px-10 text-gray-100 bg-slate-700">
          <h1 className="text-xl sm:text-2xl font-bold italic">Messages</h1>
        </div>
      </div>

      {/* Scrollable User List */}
      <div className="flex-1 overflow-y-scroll hide-scrollbar pt-2">
        <Usersection />
      </div>
    </div>
  );
};

export default Leftside;