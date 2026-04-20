import express from "express";
import me from "./me.route.js"
const router = express.Router();

router.use("/me", me);

export default router;