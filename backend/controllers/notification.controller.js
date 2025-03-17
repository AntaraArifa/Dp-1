import Notification from '../models/notification.model.js';

export const sendInterviewInvitation = async (req, res) => {
    try {
        const { recipient, message, meetingLink,interviewTime } = req.body;

        if (!recipient || !message ||!meetingLink|| !interviewTime ) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const notification = new Notification({
            recipient,
            sender: req.id, 
            message,
            meetingLink,
            interviewTime: new Date(interviewTime),
            isRead: false,
        });

        await notification.save();

        res.status(201).json({
            success: true,
            message: "Interview invitation sent successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to send interview invitation" });
    }
};
export const getNotifications = async (req, res) => {
    try {
        const userId = req.id; 
        const notifications = await Notification.find({ recipient: userId }).populate("sender","fullname").sort({ createdAt: -1 }); // Sort by timestamp, descending
       
        res.json({ success: true, notifications });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

