import db from "../config/db.js";

export const findRequest = async (senderId, receiverId) => {
    const [rows] = await db.query(`
        SELECT * FROM  chat_request 
        WHERE 
        (senderId = ? AND  receiverId = ?)
        OR 
        (senderId = ? AND receiverId = ?)`,
        [senderId, receiverId, receiverId, senderId]
    );
    return rows
};

export const insertRequest = async (senderId, receiverId) => {
    const result = await db.query(
        `INSERT INTO  chat_request (senderId, receiverId) VALUES(?, ?)`,
        [senderId, receiverId]
    );
    return result;
};

export const getRequest = async (userId) => {
    const [rows] = await db.query(
        `SELECT cr.id u.id  as senderId , u.fullName
        FROM chat_request cr
        JOIN users u ON  cr.senderId = u.id
        WHERE cr.receiverId = ? AND  cr.status = 'pending'`,
        [userId]
    );
    return rows;
};

export const updateRequest = async (requestId, status) => {
    const result = await db.query(
        `UPDATE chat_request SET status = ? WHERE id = ?`,
        [status, requestId]
    )
    return result;
};