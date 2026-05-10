import express from "express";
import { me, updateName } from "../controllers/me.controller.js";
const router = express.Router()

router.get("/", me);
router.patch("/", updateName)

export default router;