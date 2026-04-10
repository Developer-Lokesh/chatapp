import React from 'react'

const Usersection = () => {
   const data = [
  { id: 1, name: "Lokesh Sharma", profile: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop" },
  { id: 2, name: "Ananya Iyer", profile: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop" },
  { id: 3, name: "Rahul Verma", profile: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop" },
  { id: 4, name: "Priya Singh", profile: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&fit=crop" },
  { id: 5, name: "Arjun Kapoor", profile: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop" },
  { id: 6, name: "Sneha Reddy", profile: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&fit=crop" },
  { id: 7, name: "Vikram Malhotra", profile: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&h=200&fit=crop" },
  { id: 8, name: "Ishita Dutta", profile: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&h=200&fit=crop" },
  { id: 9, name: "Kabir Mehra", profile: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&fit=crop" },
  { id: 10, name: "Megha Gupta", profile: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?q=80&w=200&h=200&fit=crop" },
  { id: 11, name: "Aditya Joshi", profile: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=200&h=200&fit=crop" },
  { id: 12, name: "Riya Saxena", profile: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&fit=crop" },
  { id: 13, name: "Sahil Khan", profile: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&h=200&fit=crop" },
  { id: 14, name: "Tanvi Bansal", profile: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&h=200&fit=crop" },
  { id: 15, name: "Rohan Das", profile: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&h=200&fit=crop" },
  { id: 16, name: "Kriti Sharma", profile: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&h=200&fit=crop" },
  { id: 17, name: "Zaid Sheikh", profile: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=200&h=200&fit=crop" },
  { id: 18, name: "Neha Patil", profile: "https://images.unsplash.com/photo-1558898479-33c0057a5d12?q=80&w=200&h=200&fit=crop" },
  { id: 19, name: "Manish Rawat", profile: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=200&h=200&fit=crop" },
  { id: 20, name: "Simran Kaur", profile: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=200&h=200&fit=crop" }
];
  return (
    <div>
        {data.map((user, i) => (
            <div key={i} className='flex gap-10 border-b p-2 text-white items-center px-5 hover:bg-slate-500 duration-300'>
                <img src={`${user.profile}`} className='w-10 h-10 rounded-full '/>
                <p>{user.name}</p>

            </div>
        ))}
    </div>
  )
}

export default Usersection