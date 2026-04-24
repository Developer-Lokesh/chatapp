import { meDB } from "../services/me.service.js";

export const me = async (req, res) => {
    try {
        const id = req.user.id;
        // console.log(id);
        const data = await meDB(id);
        if(!data){
            return res.status(401).json({
                success:false,
                message:"User info not found please login first",
            })
        }
        return res.status(200).json({
            success:true,
            message:"User info fetched successfully",
            data:data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: error.message || "Internal server error"
        })
    }
}