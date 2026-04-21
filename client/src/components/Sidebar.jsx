import React, { useContext, useState } from "react";
import {
  LayoutDashboard,
  User,
  Settings,
  Search,
  LogOut,
  Bell,
  BarChart3,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import Me from "./Me";
import { AuthContext } from "../context/AuthProvider";

const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  const { userInfo } = useContext(AuthContext);
  // console.log(userInfo)
  // console.log(userInfo?.[0]?.profileImageUrl)

  // console.log(openSidebar, " in sidebar");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    {
      name: "Chat Request",
      icon: <MessageCircle size={22} />,
      path: "/chat-request",
    },
    { name: "Add friend", icon: <Search size={22} />, path: "/add-friend" },
    { name: "Profile", icon: <User size={22} />, path: "/profile" },
  ];

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${url}/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-[300px] z-40 bg-white shadow-lg transform transition-transform duration-300 ${
        openSidebar ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Sidebar Container */}
      <div
        className={`relative h-screen bg-white shadow-2xl transition-all duration-300 ease-in-out flex flex-col`}
      >
        <button
          onClick={() => setOpenSidebar((prev) => !prev)}
          className="absolute font-bold top-2 right-4 transition duration-300 hover:text-red-500"
        >
          X
        </button>

        {/* Logo Section */}
        <div className="p-6 flex items-center gap-4">
          <div className="bg-gradient-to-br from-indigo-500 to-pink-500 p-2 rounded-lg shrink-0">
            <div className="w-6 h-6 border-2 border-white rounded-md"></div>
          </div>
          {/* {!isCollapsed && ( */}
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
            GhostChat
          </span>
          {/* // )} */}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveItem(item.name)}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${
                activeItem === item.name
                  ? "bg-purple-50 text-purple-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div
                className={`${activeItem === item.name ? "text-purple-600" : "group-hover:text-purple-600"}`}
              >
                {item.icon}
              </div>
              {!isCollapsed && (
                <Link to={item.path} className="font-medium whitespace-nowrap">
                  {item.name}
                </Link>
              )}

              {/* Tooltip for Collapsed State */}
              {/* {isCollapsed && (
                <div className="absolute left-full ml-6 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                  {item.name}
                </div>
              )} */}
            </button>
          ))}
        </nav>

        {/* Footer / User Profile */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={logoutHandler}
            className={`w-full flex items-center gap-4 p-3 rounded-xl text-red-500 hover:bg-red-50 transition-all group`}
          >
            <LogOut size={22} />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>

          <div
            className={`mt-4 flex items-center gap-3 ${isCollapsed ? "justify-center" : "px-2"}`}
          >
            <img
              src={userInfo?.[0]?.profileImageUrl}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-purple-100"
            />
            {!isCollapsed && (
              <div className="overflow-hidden">
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-gray-800 truncate">
                    {userInfo?.[0]?.fullName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {userInfo?.[0]?.email}
                  </p>
                </div>
                {/* <Me/> */}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area Preview */}
      {/* <div className="flex-1 p-10 overflow-auto">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome to {activeItem}
        </h1>
        <p className="text-gray-500 mt-2">Content goes here...</p>
      </div> */}
    </div>
  );
};

export default Sidebar;
