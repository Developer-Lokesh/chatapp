import { AlignJustify } from "lucide-react";
import Sidebar from "../components/Sidebar.jsx";
import { useState } from "react";

const Header = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  // console.log(openSidebar);

  const handleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };
  return (
    <div className="flex items-center justify-between p-2 h-15 bg-[#0a0a0c] backdrop-blur-md border-b-2 border-gray-700 sticky top-0 z-50">
      {/* Left Section: Logo & Toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setOpenSidebar((prev) => !prev)}
          className="p-2 rounded-lg text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-all active:scale-90 cursor-pointer"
        >
          <AlignJustify size={24} />
          {/* <Sidebar/> */}
        </button>

        <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent italic">
          GhostChat
        </h1>
      </div>

      {openSidebar && (
        <div
          className="fixed h-screen inset-0  w-screen bg-black/70 backdrop-blue-sm"
          onClick={handleSidebar}
        ></div>
      )}

      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
    </div>
  );
};

export default Header;
