import express from 'express';
import { search, searchInFriendList } from '../controllers/search.controller.js';

const router = express.Router();

router.get("/", search)
router.get("/friends", searchInFriendList)

export default router