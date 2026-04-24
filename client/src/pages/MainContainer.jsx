// import React, { useContext } from 'react'
// import { FriendContext } from '../context/FriendProvider'
// import Leftside from '../components/Leftside';
// import Rightside from '../components/Rightside';

// const MainContainer = () => {
//   const { selectedFriend } = useContext(FriendContext);

//   return (
//     <div className='flex h-[100dvh] w-screen'>

//       <div
//         className={`  
//         ${selectedFriend ? "hidden sm:block" : "block"}`}
//       >
//         <Leftside />
//       </div>

//       <div
//         className={`
//         ${selectedFriend ? "block" : "hidden sm:block"}`}
//       >
//         <Rightside />
//       </div>

//     </div>
//   )
// }

// export default MainContainer;


import React, { useContext } from 'react'
import { FriendContext } from '../context/FriendProvider'
import Leftside from '../components/Leftside';
import Rightside from '../components/Rightside';

const MainContainer = () => {
  const { selectedFriend } = useContext(FriendContext);

  return (
    <div className='flex h-[100dvh] w-screen overflow-hidden'>
      
      {/* Leftside Logic */}
      <div
        className={`
          ${selectedFriend ? "hidden sm:block w-[30%] lg:w-[35%]" : "block w-full"}
          h-full bg-[#0a0a0c] transition-all duration-300 ease-in-out
        `}
      >
        <Leftside />
      </div>

      {/* Rightside Logic */}
      <div
        className={`
          ${selectedFriend ? "block flex-1" : "hidden sm:block sm:w-[70%] lg:w-[65%]"}
          h-full transition-all duration-300 ease-in-out
        `}
      >
        <Rightside />
      </div>

    </div>
  )
}

export default MainContainer;