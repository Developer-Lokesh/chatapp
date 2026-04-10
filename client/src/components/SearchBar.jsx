import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="flex flex-col items-center bg-slate-800 justify-center p-6">
      {/* Search Container */}
      <div 
        className={`relative w-full max-w-xl flex items-center transition-all duration-300 transform ${
          isFocused ? 'scale-[1.02]' : 'scale-100'
        }`}
      >
        {/* Search Icon */}
        <div className="absolute left-4 text-gray-400">
          <Search size={20} className={isFocused ? 'text-purple-500' : 'text-gray-400'} />
        </div>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Search........"
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setQuery(e.target.value)}
          className={`w-full py-2 pl-12 pr-12 bg-white text-gray-800 rounded-2xl shadow-lg border-2 outline-none transition-all duration-300 ${
            isFocused 
              ? 'border-purple-500 shadow-purple-200 ring-4 ring-purple-100' 
              : 'border-transparent shadow-gray-200'
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
      </div>

      {/* Decorative Gradient Line (Theme Matching) */}
      <div className="mt-4 flex gap-2">
        <span className="h-1 w-8 bg-indigo-500 rounded-full"></span>
        <span className="h-1 w-12 bg-purple-500 rounded-full"></span>
        <span className="h-1 w-8 bg-pink-500 rounded-full"></span>
      </div>

      {/* Demo Search Result Preview (Optional) */}
      {query && (
        <div className="mt-4 w-full max-w-xl bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
          <div className="p-4 text-sm text-gray-500 border-b border-gray-50">
            Results for: <span className="font-bold text-purple-600">"{query}"</span>
          </div>
          <div className="p-4 hover:bg-purple-50 cursor-pointer transition-colors">
             Searching Result
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;