import db from "../config/db.js"

export const me = async (id) => {
    try {
        const [rows] = await db.query(`
            SELECT id, fullName, email, profileImageUrl
            FROM users
            WHERE id = ?
            `, [id]);

            return rows;
    } catch (error) {
        console.log(error)
        throw new Error(error || "Something went wrong")
    }
}