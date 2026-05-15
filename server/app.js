import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";

import { Server } from "socket.io";

import { initDB } from "./src/database/init.js";

import auth from "./src/routes/auth.route.js";
import logout from "./src/routes/logout.route.js";
import chatRequest from "./src/routes/chat_request.route.js";
import search from "./src/routes/search.route.js";
import userPermisions from "./src/routes/index.js";

import { verifyUser } from "./src/middleware/auth.middleware.js";

import cookieParser from "cookie-parser";
import { verifyToken } from "./src/utils/index.js";
import { saveMessage, updateMessageStatus } from "./src/models/messages.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

// dotenv.config();

const app = express();

app.set("trust proxy", 1)

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://ghostchat-sigma.vercel.app",
    credentials: true,
  },
});

app.use(cors({ origin: "https://ghostchat-sigma.vercel.app", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/auth", auth);

app.use(verifyUser);

app.use("/user", userPermisions);

io.use((socket, next) => {
  try {
    // const token = socket.handshake.auth.accessToken;
    const cookie = socket.handshake.headers.cookie;
    const token = cookie
      ?.split("; ")
      .find((c) => c.startsWith("accessToken="))
      ?.split("=")[1];
    // console.log(token, "token");
    if (!token) {
      return next(new Error("Unauthorized"));
    }
    const decoded = verifyToken(token, process.env.JWT_ACCESS_SECRET);
    socket.user = decoded;
    next();
  } catch (error) {
    next(new Error("Invalid token"));
  }
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  const userId = socket.user.id;
  if (userId) {
    onlineUsers.set(userId, socket.id);
    console.log("user online");

    // Sabko batao user online hai
    io.emit("userOnline", userId);

    io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
  }
  if (!userId) {
    socket.disconnect();
    return;
  }
  socket.join(userId);


  socket.on("send_message", async (data) => {
    try {
      console.log("hit");

      const newMessage = {
        id: data.id,
        senderId: data.senderId,
        receiverId: data.receiverId,
        message: data.message,
        status: "sent",
        created_at: data.created_at,
      };

      // receiver ko realtime message bhejo
      io.to(data.receiverId).emit("receive_message", newMessage);

      // sender ko confirmation bhejo
      socket.emit("message_sent", newMessage);
    } catch (error) {
      console.log("send error", error);
    }
  });

  // delivered message

  socket.on("message_delivered", async ({ messageId, senderId }) => {
    try {
      await updateMessageStatus(messageId, "delivered");

      io.to(senderId).emit("message_delivered", { messageId });
    } catch (err) {
      console.log(err);
    }
  });


  socket.on("message_seen", async ({ messageId, senderId }) => {
    try {
      await updateMessageStatus(messageId, "seen");

      console.log(senderId, "senderId");
      console.log(Array.from(onlineUsers.entries()), "anttt shantt");

      const senderSocketId = onlineUsers.get(Number(senderId));

      console.log(senderSocketId, "socketId");

      if (senderSocketId) {
        io.to(senderSocketId).emit("message_seen", {
          messageId,
          status: "seen",
        });
      }
    } catch (err) {
      console.log(err);
    }
  });

  // typing indicator

  socket.on("typing", ({ senderId, receiverId }) => {
    // console.log("server receive typing", senderId, receiverId);
    io.to(receiverId).emit("typing", { senderId });
  });

  // stop typing

  socket.on("stopTyping", ({ senderId, receiverId }) => {
    io.to(receiverId).emit("stopTyping", { senderId });
  });

  socket.on("disconnect", () => {
    if (userId) {
      onlineUsers.delete(userId);
      console.log("user offline");

      io.emit("userOffline", userId);
      io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
    }
    console.log("User disconnected", userId);
  });
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

startServer();
