import {
  fetchMessage,
  findUnreadMessage,
  saveMessage,
} from "../models/messages.js";
import CryptoJs from "crypto-js";
import "dotenv";

export const saveMessageDB = async (senderId, receiverId, message) => {
  // console.log(senderId, receiverId, message, "in service")
  try {
    if (!senderId || !receiverId || !message) {
      throw new Error("Fields are missing");
    }

    const encryptedMessage = CryptoJs.AES.encrypt(
      message,
      process.env.CHAT_SECRET,
    ).toString();

    // console.log(encryptedMessage, "encryptedmessage")

    const data = await saveMessage(senderId, receiverId, encryptedMessage);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchMessageDB = async (user1, user2) => {
  try {
    if (!user1 || !user2) {
      throw new Error("Fields are missing");
    }
    const data = await fetchMessage(user1, user2);
    const decryptMessage = data.map((msg) => {
      const bytes = CryptoJs.AES.decrypt(msg.message, process.env.CHAT_SECRET);

      const originalMessage = bytes.toString(CryptoJs.enc.Utf8);

      if (!originalMessage) {
            return {
                ...msg,
                message: msg.message
            };
        }

      return { ...msg, message: originalMessage };
    });
    // console.log(decryptMessage, "decryptmessage")
    return decryptMessage;
  } catch (error) {
    throw new Error(error.message || "Internal server error");
  }
};

export const getUnreadMessageDB = async (id) => {
  // console.log(id , "in service")
  try {
    if (!id) {
      throw new Error("Id not received");
    }
    const data = await findUnreadMessage(id);
    return data;
  } catch (error) {
    throw new Error("Unread message not found", error);
  }
};
