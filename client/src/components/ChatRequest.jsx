import React, { useState, useEffect } from "react";
import { Check, X, UserPlus, Loader2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ChatRequest = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null); 

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const url = import.meta.env.VITE_SERVER_URL;
        const res = await fetch(`${url}/chat-request/`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await res.json();
        if (data) setRequests(data);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleAction = async (requestId, action) => {
    setProcessingId(requestId); 
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${url}/chat-request/${requestId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: action }),
      });
      const data = await res.json();

      if (data.success) {
        // UI se request smooth fade-out kar sakte ho ya turant filter
        setRequests((prev) => prev.filter((req) => req.id !== requestId));
      }
    } catch (error) {
      console.error(`${action} Error:`, error);
    } finally {
      setProcessingId(null);
    }
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0a0a0c]">
        <Loader2 className="text-blue-500 animate-spin" size={32} />
      </div>
    );
  }

  // 2. Empty State
  if (requests.length === 0) {
    return (
      <div className="h-screen relative flex flex-col items-center justify-center bg-[#0a0a0c] text-gray-500">
        <div className="flex py-3 absolute items-center top-2 left-5 ">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-300 hover:text-white transition"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </Link>
      </div>
        <UserPlus size={48} className="mb-4 opacity-20" />
        <p className="text-lg">No pending chat requests</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0c] min-h-screen p-4 sm:p-8">
      <div className="flex py-3 items-center ">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-300 hover:text-white transition"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </Link>
      </div>
      <div className="max-w-2xl mx-auto space-y-4">
        <h2 className="text-white text-2xl font-bold mb-6">Pending Requests</h2>
        
        {requests?.map((req) => (
          <div
            key={req.id}
            className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl transition-all hover:bg-white/10"
          >
            {/* User Info Section */}
            <div className="flex items-center gap-4 flex-1 w-full">
              <div className="relative shrink-0">
                <img
                  src={req.sender?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + req.id}
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-500/50"
                  alt="user"
                />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#0a0a0c] rounded-full"></div>
              </div>
              <div className="overflow-hidden">
                <h3 className="text-white font-medium text-lg truncate">
                  {req.fullName || "New Connection"}
                </h3>
                <p className="text-gray-400 text-sm truncate">Sent a chat invitation</p>
              </div>
            </div>

            {/* Action Buttons Section */}
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                disabled={processingId === req.id}
                onClick={() => handleAction(req.id, "accepted")}
                className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-2.5 px-5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                {processingId === req.id ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    <Check size={18} /> <span>Accept</span>
                  </>
                )}
              </button>
              
              <button
                disabled={processingId === req.id}
                onClick={() => handleAction(req.id, "rejected")}
                className="flex-1 sm:flex-none bg-gray-800 hover:bg-red-500/20 hover:text-red-400 disabled:opacity-50 text-gray-300 py-2.5 px-5 rounded-xl font-semibold transition-all border border-white/10 flex items-center justify-center gap-2"
              >
                <X size={18} /> <span>Reject</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRequest;
