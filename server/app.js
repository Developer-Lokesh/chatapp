import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";

import {Server} from "socket.io";

import { initDB } from "./src/database/init.js";

import auth from "./src/routes/auth.route.js";
import logout from "./src/routes/logout.route.js";
import chatRequest from "./src/routes/chat_request.route.js";
import search from "./src/routes/search.route.js";
import userPermisions  from "./src/routes/index.js";

import {verifyUser} from "./src/middleware/auth.middleware.js";

import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 5001

dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors:{
    origin:"http://localhost:5173",
    credentials:true
  }
})

app.use(cors({  origin: "http://localhost:5173",
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send('hello world')
})

app.use('/auth', auth)

app.use(verifyUser);

app.use("/user", userPermisions)


io.on("connetion", (socket) => {
  console.log('user connected', socket.id);

  socket.on("send_message", (data) => {
    console.log("Message", data);

    io.emit("receive_message", data)
  });

  socket.on("disconnected", (socket) => {
    console.log("User disconnected", socket.id)
  })

});







const startServer = async () => {
  try {
    await initDB();

    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Server start failed:", error);
    process.exit(1);
  }
};

startServer()

