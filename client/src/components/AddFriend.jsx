import {
  ArrowBigLeft,
  ArrowLeft,
  Check,
  Search,
  UserPlus,
  UserSearch,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddFriend = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${url}/user/search?query=${query}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data.data ," this is user data");
      if (data.success) {
        setResult(data.data);
        // setQuery("")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddFriend = async (receiverId) => {
    console.log(receiverId);
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${url}/user/chat-request/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ receiverId: receiverId }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        alert("Request send successfully");

        setSentRequests((prev) => [...prev, receiverId]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" relative p-8 bg-[#0a0a0c] min-h-screen text-white font-sans">
      <div className="flex py-3 items-center ">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-300 hover:text-white transition"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </Link>
      </div>
      <div className="max-w-2xl mx-auto">
        {/* Search Bar Section */}
        <div className="relative mb-10">
          {/* Wrapper */}
          <div className="flex items-center bg-slate-900/50 border border-white/10 rounded-2xl backdrop-blur-xl focus-within:ring-2 focus-within:ring-cyan-500/50 focus-within:border-cyan-500 transition-all">
            {/* Icon */}
            <div className="pl-4 flex items-center">
              <Search className="text-cyan-500" size={20} />
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder="Search new friends..."
              className="w-full bg-transparent py-4 px-3 text-white placeholder-gray-500 outline-none"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitHandler(e);
              }}
            />

            {/* Search Button */}
            <button
              type="button"
              onClick={submitHandler}
              className="mr-2 bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-xl text-sm font-medium transition"
            >
              Search
            </button>
          </div>

          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-cyan-500/10 blur-lg -z-10 rounded-2xl"></div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {result?.length > 0 ? (
            result?.map((user) => (
              <div
                key={user.id}
                className="group relative p-[1px] rounded-2xl bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-600 transition-all duration-500"
              >
                <div className="bg-slate-900 rounded-2xl p-5 flex items-center gap-4">
                  <img
                    src={user?.profileImageUrl}
                    alt={user?.fullName}
                    className="w-14 h-14 rounded-full border-2 border-slate-700 group-hover:border-cyan-400 transition-colors"
                  />

                  <div className="flex-1">
                    <h4 className="font-semibold text-lg leading-tight">
                      {user?.fullName}
                    </h4>
                    {/* <p className="text-xs text-gray-500 mt-1">{user.mutuals} mutual friends</p> */}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddFriend(user?.id)}
                    className={`p-2.5 rounded-xl transition-all duration-300 ${
                      sentRequests?.includes(user?.id)
                        ? "bg-green-500/20 text-green-400"
                        : "bg-white/5 hover:bg-cyan-600 text-gray-300 hover:text-white"
                    }`}
                  >
                    {sentRequests?.includes(user?.id) ? (
                      <Check size={20} />
                    ) : (
                      <UserPlus size={20} />
                    )}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 opacity-50">
              <UserSearch size={48} className="mx-auto mb-3" />
              <p>No user found!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddFriend;
