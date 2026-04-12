import db from "../config/db.js"

export const findUserbyEmail = async (email) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE email = ?" , [email]
    )
    return rows
}

export const  createUser  = async (fullName, email, password) => {
    const [result] = await db.query(
        "INSERT INTO users (fullName, email, password) VALUES(?, ? ,?)", [fullName, email, password]
    );
    return result
}