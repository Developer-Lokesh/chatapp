import express from "express";
import me from "./me.route.js"
import friends from "./friends.route.js";
import message from "./message.route.js";
import logout from "./logout.route.js";
import chatRequest from "./chat_request.route.js";
import search from "./search.route.js"

const router = express.Router();

router.use("/me", me);
router.use("/friends", friends);

router.use("/message", message);

router.use("/logout", logout);

router.use("/chat-request", chatRequest);


router.use("/search", search);




export default router;


