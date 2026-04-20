import { me } from "../models/me.js"

export const meDB = async (id) => {
    try {
        if(!id){
            throw new Error("User id required")
        }
        const data = me(id);
        return data;
    } catch (error) {
        throw new Error(error || "Something went wrong")
    }
}