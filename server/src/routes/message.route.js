import express from "express";
import { getMessages, getUnreadMessage, sendMessage } from "../controllers/message.controller.js";
const router = express.Router();

router.post("/", sendMessage);
router.get("/:id", getMessages);
router.get("/", getUnreadMessage)

export default router;