import { getChatRequestDB, sendChatRequestDB, updateChatRequestDB } from "../services/chat-request.service.js";

export const sendChatRequest = async (req, res) => {
    try {
        const senderId = req.user.id;
        const {receiverId} = req.body;
        const data = await sendChatRequestDB(senderId, receiverId)
        return res.status(201).json(data)
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message: error.message || "Something went wrong"
        })
    }
}

export const getChatRequest = async (req, res) => {
    try {
        const userId = req.user.id;
        const data = await getChatRequestDB(userId);

        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message || "Internal server error"
        })
    }
}

export const updateChatRequest = async (req, res) => {
    try {
        const {status} = req.body;
        const requestId = req.params.id;

        const data = await updateChatRequestDB(requestId, status);
        return res.status(201).json(data)
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:error.message || "Something went wrong"
        })
    }
}