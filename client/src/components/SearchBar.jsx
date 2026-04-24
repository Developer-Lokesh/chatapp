import React, { useContext, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import { FriendContext } from "../context/FriendProvider";

const SearchBar = () => {
  const {setSelectedFriend} = useContext(FriendContext)
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  // console.log(query);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${url}/user/search/friends?query=${query}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data.data);
      if (data.success) {
        setResult(data.data);
        // setQuery("")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeHandler = () => {
    setResult([]);
    setQuery("");
  };

  const handleClear = () => {
    // setQuery("");
  };

  return (
    <div className="flex flex-col items-center bg-[#0a0a0c] justify-center p-6">
      {/* Search Container */}
      <form
        onSubmit={submitHandler}
        className={`relative w-full max-w-xl flex items-center transition-all duration-300 transform ${
          isFocused ? "scale-[1.02]" : "scale-100"
        }`}
      >
        {/* Search Icon */}
        <div className="absolute left-4 text-gray-400">
          <Search
            size={20}
            className={isFocused ? "text-purple-500" : "text-gray-400"}
          />
        </div>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Name or Email..."
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setQuery(e.target.value)}
          className={`w-full py-2 pl-12 pr-12 bg-white text-gray-800 rounded-2xl shadow-lg border-2 outline-none transition-all duration-300 ${
            isFocused
              ? "border-purple-500 shadow-purple-200 ring-4 ring-purple-100"
              : "border-transparent shadow-gray-200"
          }`}
        />

        {/* Clear/Cross Icon */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </form>

      {/* Decorative Gradient Line (Theme Matching) */}
      <div className="mt-4 flex gap-2">
        <span className="h-1 w-8 bg-indigo-500 rounded-full"></span>
        <span className="h-1 w-12 bg-purple-500 rounded-full"></span>
        <span className="h-1 w-8 bg-pink-500 rounded-full"></span>
      </div>

      {/* Demo Search Result Preview (Optional) */}
      {query && (
        <div className={`mt-4 w-full overflow-y-auto hide-scrollbar max-w-xl relative bg-white rounded-xl shadow-xl 
        border border-gray-100 animate-in fade-in slide-in-from-top-2 ${result.length > 1 ? "h-52" : "h-fit"}`}>
          <div className="p-4 text-sm text-gray-500 border-b border-gray-50">
            Results for:{" "}
            <span className="font-bold text-purple-600">"{query}"</span>
            {result?.map((data) => (
              <div
                key={data.id}
                onClick={setSelectedFriend(data)}
                className="flex cursor-pointer  space-x-4 p-2 justify-between items-center hover:bg-gray-200"
              >
                <span className="flex items-center space-x-4">
                  <img
                    src={data?.profileImageUrl}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{data.fullName}</span>
                </span>
                
              </div>
            ))}
          </div>
          <button onClick={closeHandler} className="absolute top-2 right-4">
            <X />
          </button>
          <div className="p-4 hover:bg-purple-50  transition-colors">
            {result?.length > 0 ? "Search Result" : "Result not found"}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
