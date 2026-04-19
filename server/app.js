import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import { initDB } from "./src/database/init.js";

import auth from "./src/routes/auth.route.js"
import logout from "./src/routes/logout.route.js"
import chatRequest from "./src/routes/chat_request.route.js"
import search from "./src/routes/search.route.js"

import {verifyUser} from "./src/middleware/auth.middleware.js"

import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 5001

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send('hello world')
})

app.use('/auth', auth)

app.use(verifyUser);

app.use("/logout", logout);
app.use("/chat-request", chatRequest)
app.use("/search", search)



const startServer = async () => {
  try {
    await initDB();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Server start failed:", error);
    process.exit(1);
  }
};

startServer()

