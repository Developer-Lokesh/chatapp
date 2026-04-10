import { AlignJustify } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex items-center justify-between p-2 h-15 bg-slate-900 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      
      {/* Left Section: Logo & Toggle */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-all active:scale-90 cursor-pointer">
          <AlignJustify size={24} />
        </button>
        
        <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent italic">
          GhostChat
        </h1>
      </div>

      {/* Right Section (Optional): Profile or Status */}
      {/* <div className="flex items-center gap-3">
        <div className="hidden sm:block text-right">
          <p className="text-xs font-bold text-gray-800">Online</p>
          <p className="text-[10px] text-green-500 flex items-center justify-end gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            System Ready
          </p>
        </div>
      </div> */}

    </div>
  );
};

export default Header;