import { friends } from "../models/friends.js";

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