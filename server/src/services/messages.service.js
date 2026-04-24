import { fetchMessage, saveMessage } from "../models/messages.js"

export const saveMessageDB = async (senderId, receiverId, message) => {
    console.log(senderId, receiverId, message, "in service")
    try {
        if(!senderId || !receiverId || !message){
            throw new Error("Fields are missing")
        }
        const data = await saveMessage(senderId, receiverId, message);
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchMessageDB = async (user1, user2) => {
    try {
        if(!user1, !user2){
            throw new Error("Fields are missing")
        }
        const data = await fetchMessage(user1, user2);
        return data;
    } catch (error) {
        throw new Error(error.message || "Internal server error")
    }
}