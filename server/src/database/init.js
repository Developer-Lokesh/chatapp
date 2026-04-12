import { createUserTable } from "./users.js"

export const initDB = async () => {
    try {
        await createUserTable();

        console.log("All tables initialized")
    } catch (error) {
        console.log("Something went wrong while init tables", error)
    }
}