import { friendsDB, unFriendDB } from "../services/friends.service.js";

export const friends = async (req, res) => {
    const id = req.user.id;
    console.log(id)
    try {
        const data = await friendsDB(id);
        // console.log(data, "this is data")
        return res.status(200).json({
            success:true,
            message:"Friends info fetched successfully",
            data:data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export const removeFriend = async (req, res) => {
    const id = req.user.id;
    const {receiverId} = req.body;
    try {
        const data = await unFriendDB(id, receiverId);
        if(!data){
            return res.status(400).json({
                success:false,
                message:"failed to remove friend"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Unfriend successfully",
            data:data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}