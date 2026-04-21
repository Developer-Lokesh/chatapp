import express from "express";
import me from "./me.route.js"
import friends from "./friends.route.js"

const router = express.Router();

router.use("/me", me);
router.use("/friends", friends)

export default router;