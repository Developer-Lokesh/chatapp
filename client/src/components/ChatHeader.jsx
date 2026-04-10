import React from 'react'

const ChatHeader = () => {
  return (
    <div className='flex items-center h-15 bg-slate-800 px-10 gap-5'>
        <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=200&h=200&fit=crop" alt="User Image" className='w-10 h-10 rounded-full' />
        <span >
            <p>Lokesh</p>
            <p className='text-gray-400'>Online</p>
        </span>
    </div>
  )
}

export default ChatHeader