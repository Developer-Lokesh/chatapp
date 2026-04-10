import React from 'react'
import ChatHeader from './ChatHeader'
import ChatScreen from './ChatScreen'
import Chatfooter from './Chatfooter'

const Rightside = () => {
  return (
    <div className='hidden sm:block sm:w-[70%] bg-amber-400 overflow-hidden '>
        <div>
            <ChatHeader/>
        </div>
        <div>
            <ChatScreen/>
        </div>

        

        
    </div>
  )
}

export default Rightside