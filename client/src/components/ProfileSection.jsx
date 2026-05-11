import React, { useContext } from "react";
import { Mail, Edit2, ArrowLeft, Edit3Icon } from "lucide-react";
import { Link } from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify'
import { AuthContext } from "../context/AuthProvider";
import { useState } from "react";

const ProfileSection = ({ userData }) => {
  const { userInfo } = useContext(AuthContext);
  const [handle, setHandle] = useState(false);
  const [input, setInput] = useState(userInfo?.[0]?.fullName || "");
  const [open, setOpen] = useState(false);
  // console.log(handle);
  // console.log(handle);

  const handleForm = () => {
    setHandle(true);
    setInput(userInfo?.[0]?.fullName || "");
  };

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const saveChanges = async (e) => {
    console.log("clicked")
    e.preventDefault();
    try {
      if(!input.trim()) return;
      const url = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${url}/user/me/`, {
        method:"PATCH",
        headers:{
          "Content-Type": "application/json"
        },
        credentials:"include",
        body:JSON.stringify({fullName : input})
      });

      const data = await res.json();
      if(!data.success){
        toast.error("Something went wrong");
        return;
      }
      toast.success("Username updated successfully")
      setHandle(false)
      // console.log(data)

    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="w-full min-h-screen relative flex justify-center items-center bg-[#0a0a0c] p-4">
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition={Bounce}
      />
      <div className="flex py-3 absolute top-2 left-3 items-center ">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-300 hover:text-white transition"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </Link>
      </div>
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 opacity-80"></div>

        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-16 mb-6">
            <div className="relative p-1 bg-gray-900 rounded-full ring-4 ring-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              <img
                src={
                  userInfo?.[0]?.profileImageUrl ||
                  "https://via.placeholder.com/150"
                }
                alt={userInfo?.[0]?.fullName}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-900"
              />
            </div>

            <button 
            onClick={() => setOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full flex items-center gap-2 transition-all font-medium mb-2 shadow-lg shadow-blue-500/20">
              <Edit2 size={16} />
              Edit Profile
            </button>
          </div>


{
        open && (
          <div 
          className="fixed inset-0 text-white  bg-black/50 flex items-center justify-center">

            <div className="bg-gray-950 p-6 border border-white rounded-xl w-[350px]">

              <h1 className="text-xl font-bold mb-4">
                Update Profile
              </h1>

              <input
                type="file"
                className="border p-2 w-full mb-4 rounded-md"
              />

              <div className="flex gap-3">

                <button className="bg-blue-400 transition duration-300 hover:bg-blue-600 text-white px-4 py-2 rounded">
                  Save
                </button>

                <button
                  onClick={() => setOpen(false)}
                  className="bg-gray-300 text-black transition duration-300 hover:bg-red-500 hover:text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>
        )
      }








          <div className="space-y-4">
            <div className="flex gap-5 ">
              {handle ? (
                <div className="flex border-2 border-blue-800 p-2 rounded-lg ">
                  <input
                    type="text"
                    value={input}
                    onChange={inputHandler}
                    className="text-3xl outline-none px-2 border-white rounded-sm w-40 font-bold text-white tracking-tight"
                  />
                  <button
                  onClick={saveChanges}
                  className="bg-blue-600 px-3 py-2 rounded-sm cursor-pointer text-white hover:text-gray-200">
                    Save changes
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-white tracking-tight">
                    {userInfo?.[0]?.fullName || "User"}
                  </h2>
                  <button
                    onClick={handleForm}
                    className=" w-fit h-fit cursor-pointer text-gray-400 transition-all hover:scale-x-50 hover:text-gray-300 "
                  >
                    <Edit3Icon width={20} height={20} />
                  </button>
                </>
              )}
            </div>

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
