import React from "react";
import { Mail, Edit2 } from "lucide-react";

const ProfileSection = ({ userData }) => {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      {/* Profile Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {/* Banner / Cover Header */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 opacity-80"></div>

        {/* User Info Container */}
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-16 mb-6">
            {/* Profile Image with Neon Ring */}
            <div className="relative p-1 bg-gray-900 rounded-full ring-4 ring-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              <img
                src={userData?.avatar || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-900"
              />
            </div>

            {/* Edit Button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full flex items-center gap-2 transition-all font-medium mb-2 shadow-lg shadow-blue-500/20">
              <Edit2 size={16} />
              Edit Profile
            </button>
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                {userData?.name || "Lokesh"}
              </h2>
              <p className="text-blue-400 font-medium tracking-wide uppercase text-xs mt-1">
                Full Stack Developer
              </p>
            </div>

            <p className="text-gray-300 leading-relaxed max-w-lg">
              {userData?.bio ||
                "Gymnast by passion, Developer by profession. Building cool things with MERN Stack & Tailwind CSS."}
            </p>

            {/* Stats/Details */}
            <div className="flex flex-wrap gap-6 py-4 border-y border-white/5">
              {/* <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={18} className="text-red-400" />
                <span className="text-sm">Moradabad, UP</span>
              </div> */}
              <div className="flex items-center gap-2 text-gray-400">
                <Mail size={18} className="text-blue-400" />
                <span className="text-sm">lokesh@example.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
