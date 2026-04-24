import db from "../config/db.js";

export const messages = async () => {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            senderId INT,
            receiverId INT,
            message TEXT,
            create_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (senderId) REFERENCES users(id),
            FOREIGN KEY (receiverId) REFERENCES users(id)
             )`;
             await db.query(query);
             console.log("Messages table created or already exists");
    } catch (error) {
        console.error("Table creation error:", error.message);
        throw new Error("Something went wrong while create table");
    }
}