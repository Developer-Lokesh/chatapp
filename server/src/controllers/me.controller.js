import { meDB, updateNameDB, updateProfileDB } from "../services/me.service.js";

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

export const updateName = async (req, res) => {
    try {
        const id = req.user.id;
        const {fullName} = req.body
        console.log(id, fullName, "this is info")
        const data = await updateNameDB(id, fullName);
        console.log(data, "this is data")
         if(!data){
            return res.status(401).json({
                success:false,
                message:"Something went wrong while change username",
            })
        }
        return res.status(200).json({
            success:true,
            message:"username update successfully",
            data:data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message || "Internal server error"
        })
    }
};

export const updateProfile = async (req, res) => {
    try {
        const id = req.user.id;
        const {profileImageUrl, profileImagePublicId} = req.body;
        // console.log(id, profileImageUrl, profileImagePublicId)
        const data = await updateProfileDB(id, profileImageUrl, profileImagePublicId);
        if(!data){
            return res.status(404).json({
                success:false,
                message:"Something went wrong while update profile"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Profile image updated successfully",
            data:data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server errro"
        })
    }
};