import { LucideSendHorizontal } from 'lucide-react'
import React from 'react'

const Chatfooter = () => {
  return (
     <div className="p-3 border-t h-18 bg-gray-900 border-gray-700 flex gap-2">
        <input
          type="text"
          placeholder="Type message..."
          className="flex-1 px-4 py-2 rounded-full bg-[#1e293b] outline-none"
        />
        <button className="bg-green-500 px-4 py-2 rounded-full text-black">
          <LucideSendHorizontal/>
        </button>
      </div>
  )
}

export default Chatfooter