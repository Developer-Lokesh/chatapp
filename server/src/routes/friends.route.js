import express from "express";
import { friends } from "../controllers/friends.controller.js";

const router = express.Router();

router.get("/", friends);

export default router;