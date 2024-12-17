import express from "express";
import {
  allMessages,
  sendMessage,
} from "../controllers/message.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/:chatId").get(isAuthenticated, allMessages);
router.route("/send").post(isAuthenticated, sendMessage);

export default router;