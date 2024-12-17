import express from "express"
import {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} from "../controllers/chat.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";


const router = express.Router();

router.route("/accesschat").post(isAuthenticated, accessChat);
router.route("/fetchchat").get(isAuthenticated, fetchChats);
router.route("/group").post(isAuthenticated, createGroupChat);
router.route("/rename").put(isAuthenticated, renameGroup);
router.route("/groupremove").put(isAuthenticated, removeFromGroup);
router.route("/groupadd").put(isAuthenticated, addToGroup);

export default router;