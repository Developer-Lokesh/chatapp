import express from "express";
import { me } from "../controllers/me.controller.js";
const router = express.Router()

router.get("/", me);

export default router;