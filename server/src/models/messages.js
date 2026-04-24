import db from "../config/db.js";

export const saveMessage = async (senderId, receiverId, message) => {
    const [result] = await db.query(`
        INSERT INTO messages (senderId, receiverId, message) VALUES (?, ?, ?)
        `, [senderId, receiverId, message]);

        return result.insertId;
};

export const fetchMessage = async (user1, user2) => {
    const [messages] = await db.query(`
        SELECT * FROM messages
        WHERE (senderId = ? AND receiverId = ?)
        OR (senderId = ? AND receiverId = ?)
        ORDER BY create_At ASC`, [user1, user2, user2, user1]);
        
        return messages;
};