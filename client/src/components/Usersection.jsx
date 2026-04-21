import React, { useContext } from 'react'
import { FriendContext } from '../context/FriendProvider';

const Usersection = () => {
  const {friendInfo} = useContext(FriendContext);
  console.log(friendInfo, "this is friendInfo")

  return (
    <div>
        {friendInfo?.map((user, i) => (
            <div key={i} className='flex gap-10 border-b p-2 text-white items-center px-5 hover:bg-slate-500 duration-300'>
                <img src={`${user?.profileImageUrl}`} className='w-10 h-10 rounded-full '/>
                <p>{user?.fullName}</p>

            </div>
        ))}
    </div>
  )
}

export default Usersection