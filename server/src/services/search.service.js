import { search, searchFriend } from "../models/search.js";

export const searchDB = async (query, userId) => {
    try {
        if(!query){
            throw new Error("Search query required");
        }
        const res = await search(query, userId);
        if(!res){
            throw new Error("User not found");
        }
        return res;
    } catch (error) {
        console.log(error);
        throw new Error(error || "Something went wrong")
    }
}

export const searchInFriendListDB = async (query, userId) => {
    try {
        if(!query){
            throw new Error("Search query required");
        }
        const res = await searchFriend(query, userId);
        if(!res){
            throw new Error("User not found");
        }
        return res;
    } catch (error) {
        console.log(error);
        throw new Error(error || "Something went wrong")
    }
}