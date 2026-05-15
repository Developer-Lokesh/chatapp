import express from "express";
import { friends, removeFriend } from "../controllers/friends.controller.js";

const router = express.Router();

router.get("/", friends);
router.delete("/", removeFriend)

export default router;