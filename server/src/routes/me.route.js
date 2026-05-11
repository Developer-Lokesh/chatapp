import express from "express";
import { me, updateName, updateProfile } from "../controllers/me.controller.js";
const router = express.Router()

router.get("/", me);
router.patch("/", updateName);
router.patch("/updateprofile", updateProfile)

export default router;