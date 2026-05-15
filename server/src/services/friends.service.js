import { friends, unFriend } from "../models/friends.js";

export const friendsDB = async (id) => {
    try {
        const res = await friends(id);
        if(!res){
            throw new Error("Please add some friends")
        }
        return res;
    } catch (error) {
        console.log(error);
        throw new Error(error || "Something went wrong")
    }
};

export const unFriendDB = async (id, friendId) => {
    console.log(id, friendId, "in service")
    try {
        if(!id || !friendId){
            throw new Error("id is required")
        }
        const data = await unFriend(id, friendId);
        return data;
    } catch (error) {
        throw new Error("Something went wrong", error)
    }
}