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

export const updateName = async (id, fullName) => {
    console.log(id, fullName, "in model")

    try {
        const [rows] = await db.query(`
            UPDATE users 
            SET fullName = ?
            WHERE id = ?`, [fullName, id])

            return rows
    } catch (error) {
        throw new Error(error)
    }
};

export const updateProfile = async (id, img, profileImagePublicId) => {
    try {
        const [rows] = await db.query(`
            UPDATE users
            SET  profileImageUrl = ?, 
             profileImagePublicId = ?
            WHERE id = ?`, [img, profileImagePublicId, id]);
            return rows;
    } catch (error) {
        throw new Error("Something went wrong")
    }
}
