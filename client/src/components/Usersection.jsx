import React, { useContext } from 'react'
import { FriendContext } from '../context/FriendProvider';
import { Link } from 'react-router-dom';

const Usersection = () => {
  const {friendInfo, setSelectedFriend} = useContext(FriendContext);
  // console.log(friendInfo, "this is friendInfo");



  return (
    <div>
        {friendInfo?.map((user, i) => (
            <div key={i} 
            onClick={() => setSelectedFriend(user)}
            className='flex gap-10 border-b-2 border-gray-700 p-2 text-white items-center px-5 hover:bg-slate-500 duration-300 cursor-pointer'>
                <img src={`${user?.profileImageUrl}`} className='w-10 h-10 rounded-full '/>
                <p>{user?.fullName}</p>

            </div>
        ))}
    </div>
  )
}

export default Usersection