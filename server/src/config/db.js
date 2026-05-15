// const mysql  = require("mysql2/promise");
import mysql from "mysql2/promise"
import dotenv from 'dotenv'

dotenv.config()

const db = mysql.createPool({
    uri: process.env.DATABASE_URL,
    ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true 
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})
// const db = mysql.createPool(process.env.DATABASE_URL)

// const db = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database : process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit : 10,
//     queueLimit: 0
// })


const checkConnection = async () => {
    try {
        const conn = await db.getConnection();
        console.log("Database connected successfully");
        conn.release();
    } catch (error) {
        console.log("Databae connection failed", error);
    }
}

checkConnection();

export default db;