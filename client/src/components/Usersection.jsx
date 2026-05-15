
import React, { useContext, useState } from "react";
import { FriendContext } from "../context/FriendProvider";
import { SocketContext } from "../context/SocketProvider";
import {
  EllipsisVertical,
  UserMinus,
  Users,
} from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Usersection = () => {
  const {
    friendInfo,
    setFriendInfo,
    setSelectedFriend,
    selectedFriend,
  } = useContext(FriendContext);

  const { typing, unreadCounts } = useContext(SocketContext);

  const [openMenu, setOpenMenu] = useState(null);

  // Toggle dropdown menu
  const toggleMenu = (e, user) => {
    e.stopPropagation();

    setOpenMenu(openMenu === user.id ? null : user.id);
  };

  // Select friend
  const handleSelectFriend = (user) => {
    setSelectedFriend(user);

    localStorage.setItem(
      "selectedFriend",
      JSON.stringify(user)
    );
  };

  // Remove friend
  const removeFriend = async (e, user) => {
    e.stopPropagation();

    try {
      const confirmDelete = window.confirm(
        `Remove ${user.fullName} from friends?`
      );

      if (!confirmDelete) return;

      const url = import.meta.env.VITE_SERVER_URL;

      const res = await fetch(`${url}/user/friends/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          receiverId: user.id,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error("Failed to remove friend");
        return;
      }

      // remove from UI instantly
      setFriendInfo((prev) =>
        prev.filter((friend) => friend.id !== user.id)
      );

      localStorage.removeItem("selectedFriend");

      // clear selected chat if removed user is open
      if (selectedFriend?.id === user.id) {
        setSelectedFriend(null);
      }

      setOpenMenu(null);

      toast.success("Friend removed successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Empty UI
  if (!friendInfo || friendInfo.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-6 text-white">
        <div className="bg-[#111827] p-6 rounded-full mb-5 shadow-lg">
          <Users size={50} className="text-blue-500" />
        </div>

        <h2 className="text-2xl font-bold mb-2">
          No Friends Yet
        </h2>

        <p className="text-gray-400 max-w-xs">
          Start connecting with people and build your chat
          circle 
        </p>
        <Link to="/add-friend" className="text-blue-700 ">Add Friends</Link>

        
      </div>
    );
  }

  return (
    <div className="w-full">
      {friendInfo?.map((user) => {
        const isThisUserTyping = typing[String(user?.id)];

        return (
          <div
            key={user.id}
            onClick={() => handleSelectFriend(user)}
            className="flex items-center justify-between border-b border-gray-800 px-4 py-3 text-white hover:bg-[#1f2937] duration-300 cursor-pointer relative"
          >
            {/* Left Side */}
            <div className="flex items-center gap-4">
              {/* Profile */}
              <div className="relative">
                <img
                  src={user?.profileImageUrl}
                  className="w-12 h-12 rounded-full object-cover border border-gray-700"
                  alt={user?.fullName}
                />
              </div>

              {/* User Info */}
              <div>
                <p className="font-medium text-[15px]">
                  {user?.fullName}
                </p>

                {isThisUserTyping ? (
                  <p className="text-green-400 text-sm animate-pulse">
                    typing...
                  </p>
                ) : (
                  <p className="text-gray-400 text-sm">
                    Tap to chat
                  </p>
                )}
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3 relative">
              {/* unread count */}
              {unreadCounts[String(user.id)] > 0 && (
                <span className="min-w-[22px] h-[22px] flex items-center justify-center bg-blue-500 text-white text-xs rounded-full px-1">
                  {unreadCounts[String(user.id)]}
                </span>
              )}

              {/* menu button */}
              <button
                onClick={(e) => toggleMenu(e, user)}
                className="p-1 rounded-full hover:bg-gray-700 transition"
              >
                <EllipsisVertical size={18} />
              </button>

              {/* dropdown */}
              {openMenu === user.id && (
                <div className="absolute top-10 right-0 bg-[#111827] border border-gray-700 rounded-lg shadow-xl w-44 z-50 overflow-hidden">
                  <button
                    onClick={(e) => removeFriend(e, user)}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-red-500/20 text-red-400 transition"
                  >
                    <UserMinus size={16} />
                    Remove Friend
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Usersection;