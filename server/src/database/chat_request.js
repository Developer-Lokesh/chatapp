import db from "../config/db.js"

export const createChatRequestTable = async () => {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS chat_request (
        id INT AUTO_INCREMENT PRIMARY KEY,
        senderId INT,
        receiverId INT,
        status ENUM('pending', 'rejected', 'accepted') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
        await db.query(query);
        console.log("Chat request table created successfully")
    } catch (error) {
        throw new Error("Something went wrong while create table", error)
    }
}

createChatRequestTable();