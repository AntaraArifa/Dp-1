import express from "express"
import {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  resolveEmails,
} from "../controllers/chat.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  allMessages,
  sendMessage,
} from "../controllers/message.controller.js";


const router = express.Router();

router.route("/chat").post(isAuthenticated, accessChat);
router.route("/chat").get(isAuthenticated, fetchChats);
router.route("/group").post(isAuthenticated, createGroupChat);
router.route("/groupremove").put(isAuthenticated, removeFromGroup);
router.route("/groupadd").put(isAuthenticated, addToGroup);
router.route("/resolve-emails").post(isAuthenticated, resolveEmails);
router.route("/:chatId").get(isAuthenticated, allMessages);
router.route("/chatsend").post(isAuthenticated, sendMessage);

export default router;