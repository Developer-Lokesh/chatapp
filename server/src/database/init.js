import { createChatRequestTable } from "./chat_request.js";
import { createUserTable } from "./users.js"

export const initDB = async () => {
    try {
        await createUserTable();
        await createChatRequestTable()

        console.log("All tables initialized")
    } catch (error) {
        console.log("Something went wrong while init tables", error)
    }
}