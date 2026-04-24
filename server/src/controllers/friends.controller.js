import { friendsDB } from "../services/friends.service.js";

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