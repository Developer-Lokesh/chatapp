import React, { useContext } from "react";
import { FriendContext } from "../context/FriendProvider";
import { SocketContext } from "../context/SocketProvider";

const Usersection = () => {
  const { friendInfo, setSelectedFriend } = useContext(FriendContext);
  const { typing } = useContext(SocketContext);

  return (
    <div >
      {friendInfo?.map((user, i) => {
        const isThisUserTyping = typing[String(user?.id)];

        return (
          <div
            key={i}
            onClick={() => setSelectedFriend(user)}
            className="flex gap-10 border-b-2 border-gray-700 p-2 text-white items-center px-5 hover:bg-slate-500 duration-300 cursor-pointer"
          >
            <img
              src={`${user?.profileImageUrl}`}
              className="w-10 h-10 rounded-full"
              alt=""
            />
            <span>
              <p>{user?.fullName}</p>
              {isThisUserTyping ? (
                <p className="text-green-500 animate-bounce text-sm">typing...</p>
              ) : (
                <p className="text-gray-500 text-sm"></p>
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Usersection;