import db from "../config/db.js";

export const messages = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        senderId INT NOT NULL,
        receiverId INT NOT NULL,
        message TEXT NOT NULL,

        status ENUM('sent','delivered','seen') DEFAULT 'sent',

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        delivered_at TIMESTAMP NULL,
        seen_at TIMESTAMP NULL,

        FOREIGN KEY (senderId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (receiverId) REFERENCES users(id) ON DELETE CASCADE
      )
    `;

    await db.query(query);
    console.log("Messages table ready");
  } catch (error) {
    console.error("Table creation error:", error.message);
    throw new Error("Something went wrong while create table");
  }
};