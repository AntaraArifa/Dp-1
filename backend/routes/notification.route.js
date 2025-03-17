import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getNotifications, sendInterviewInvitation } from "../controllers/notification.controller.js";


const router = express.Router();

router.route("/send").post(isAuthenticated, sendInterviewInvitation);
router.route("/get").get(isAuthenticated, getNotifications);


export default router;
