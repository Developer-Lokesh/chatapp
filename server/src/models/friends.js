import db from "../config/db.js";

export const friends = async (userId) => {
    try {
        const [friends] = await db.query(`
            SELECT DISTINCT u.id, u.fullName, u.email, u.profileImageUrl
            FROM users u
            JOIN chat_request c
            ON (
            (c.senderId = ? AND c.receiverId = u.id)
            OR 
            (c.receiverId = ? AND c.senderId = u.id)
            )
            WHERE c.status = 'accepted'
            `, [userId, userId]
        );
        // console.log(friends, "in schema")
        return friends

    } catch (error) {
        throw new Error(error || "Please Add friends")
    }
};