import { findRequest, getRequest, insertRequest, updateRequest } from "../models/chat_request.js";

export const sendChatRequestDB = async (senderId, receiverId) => {
    if(!senderId || !receiverId){
        throw new Error("Id not receive")
    }

    if(senderId === receiverId){
        throw new Error("You can't send request to yourself");
    }
    
    const existing  = await findRequest(senderId, receiverId);

    if(existing.length > 0){
        throw new Error("Request already exists");
    }

    await insertRequest(senderId, receiverId);

    return {
        success:true,
        message:"Request sent"
    }
}

export const getChatRequestDB = async (userId) => {
    if(!userId){
        throw new Error("userId not receive")
    }
    return await getRequest(userId);
}

export const updateChatRequestDB = async (requested, status) => {
     if(!requested || !status){
        throw new Error("request and status not received")
    }

    if(!["accepted", "rejected"].includes(status)){
        throw new Errow("Invalid status");
    }

    await updateRequest(requested, status);
    
    return {
        success:true,
        message: `Request ${status}`
    }
}