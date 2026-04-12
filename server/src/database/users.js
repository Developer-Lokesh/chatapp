import db from '../config/db.js'

export const createUserTable  = async () => {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fullName VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(250) NOT NULL,
        create_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP )`;

        await db.query(query);

        console.log("users table created successfully");

    } catch (error) {
        console.log("Something went wrong while creating table...", error)
    }
}

createUserTable();