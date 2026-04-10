// const Messages = () => {
//   return (
//     <div className="p-4 space-y-3 bg-[#020617]    text-white">
//       {/* Received Message */}
//       <div className="flex">
//         <div className="bg-[#1e293b] px-4 py-2 rounded-2xl rounded-tl-none max-w-xs">
//           Hello bhai 👻
//         </div>
//       </div>

//       {/* Sent Message */}
//       <div className="flex justify-end">
//         <div className="bg-green-500 px-4 py-2 rounded-2xl rounded-tr-none max-w-xs text-black">
//           Kya haal hai
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Messages;


import React, { useEffect, useRef } from "react";

const Messages = () => {
  const messages = [
    { text: "Hello bhai 👻", sender: "other" },
    { text: "Kya haal hai", sender: "me" },
    { text: "Sab badiya 🔥", sender: "other" },
    { text: "Tu bata", sender: "me" },
  ];

  const bottomRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="p-4 space-y-3 text-white">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.sender === "me" ? "justify-end" : ""
          }`}
        >
          <div
            className={`px-4 py-2 rounded-2xl max-w-xs ${
              msg.sender === "me"
                ? "bg-green-500 text-black rounded-tr-none"
                : "bg-[#1e293b] rounded-tl-none"
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}

      {/* 👇 important for scroll */}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default Messages;
