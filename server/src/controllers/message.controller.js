import { fetchMessageDB, saveMessageDB } from "../services/messages.service.js";

export const sendMessage = async (req, res) => {
    try {
        const id = req.user.id;
        const {message, receiverId} = req.body;

        // console.log(message, receiverId, "in controller")

        const data = await saveMessageDB(id, receiverId, message)
        if(!data){
            return res.status(400).json({
                success:false,
                message:"Message not found"
            });
        }
        return res.status(201).json({
            success:true,
            message:"Message send successfully",
            data:data,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
};

export const getMessages = async (req, res) => {
    try {
        const user1 = req.user.id;
        const user2 = req.params.id;

        

        const data = await fetchMessageDB(user1, user2);
        if(!data){
            return res.status(400).json({
                success:false,
                message:"Message not found"
            });
        }
        return res.status(200).json({
            success:true,
            message:"Message fetched successfully",
            data:data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "Internal server error"
        })
    }
}