import express from "express";
import dotenv from "dotenv"
import { initDB } from "./src/database/init.js";

import auth from "./src/routes/auth.route.js"
import logout from "./src/routes/logout.route.js"

import {verifyUser} from "./src/middleware/auth.middleware.js"

import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 5001

dotenv.config();

const app = express();
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send('hello world')
})

app.use('/auth', auth)

app.use(verifyUser);

app.use("/logout", logout)



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

