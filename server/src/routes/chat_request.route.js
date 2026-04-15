import express from "express"
import { getChatRequest, sendChatRequest, updateChatRequest } from "../controllers/chat_request.controller.js";

const router = express.Router();

router.post("/", sendChatRequest)
router.get("/", getChatRequest)
router.put("/:id", updateChatRequest)

export default router;