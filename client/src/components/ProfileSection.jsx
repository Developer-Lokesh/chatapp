import React, { useContext } from "react";
import { Mail, Edit2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const ProfileSection = ({ userData }) => {
  const {userInfo} = useContext(AuthContext)
  return (
    <div className="w-full min-h-screen relative flex justify-center items-center bg-[#0a0a0c] p-4">
      <div className="flex py-3 absolute top-2 left-3 items-center ">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-300 hover:text-white transition"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </Link>
      </div>
      {/* Profile Card */}
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 opacity-80"></div>

        {/* Content */}
        <div className="px-8 pb-8">
          
          <div className="relative flex justify-between items-end -mt-16 mb-6">
            
            {/* Profile Image */}
            <div className="relative p-1 bg-gray-900 rounded-full ring-4 ring-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              <img
                src={userInfo?.[0]?.profileImageUrl || "https://via.placeholder.com/150"}
                alt={userInfo?.[0]?.fullName}
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
                {userInfo?.[0]?.fullName || "Lokesh Kashyap"}
              </h2>

              
            </div>

            

            {/* Email */}
            <div className="flex items-center gap-2 text-gray-400 py-4 border-t border-white/5">
              <Mail size={18} className="text-blue-400" />
              <span className="text-sm">
                {userInfo?.[0]?.email || "lokesh@example.com"}
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;