import expressAsyncHandler from "express-async-handler";
import Chat from "../models/chat.model.js";
import { User } from "../models/user.model.js";


const accessChat = expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }
    const sender = req.id;

    var isChat = await Chat.findOne({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: userId } } },
            { users: { $elemMatch: { $eq: sender } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");

    if (!isChat) {
        const recipient = await User.findById(userId).select('name');
        
        var chatData = {
            chatName: recipient.name, 
            isGroupChat: false,
            users: [sender, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    } else {
        res.send(isChat);
    }
});



const fetchChats = async (req, res) => {
    try {
        const userId = req.id; 
        const chats = await Chat.find({ users: { $elemMatch: { $eq: userId } } })
            .sort({ updatedAt: -1 })
            .populate({
                path: "users",
                select: "-password", 
            })
            .populate({
                path: "groupAdmin",
                select: "-password", 
            })
            .populate({
                path: "latestMessage",
                populate: {
                    path: "sender",
                    select: "fullname profile.profilePhoto email", 
                },
            });

        if (!chats || chats.length === 0) {
            return res.status(404).json({
                message: "No chats found",
                success: false,
            });
        }

        return res.status(200).json({
            chats,
            success: true,
        });
    } catch (error) {
        console.error("Error fetching chats:", error);
        return res.status(500).json({
            message: "Failed to fetch chats",
            success: false,
            error: error.message,
        });
    }
};



const createGroupChat = expressAsyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please Fill all the feilds" });
    }

    let users = req.body.users;
    if (!Array.isArray(users)) {
        return res.status(400).send({ message: "Invalid users format" });
    }
    if (users.length < 2) {
        return res
            .status(400)
            .send("More than 2 users are required to form a group chat");
    }

    users.push(req.id);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});



const removeFromGroup = expressAsyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;



    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId },
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!removed) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(removed);
    }
});


const addToGroup = expressAsyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId },
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(added);
    }
});
const resolveEmails=expressAsyncHandler( async (req, res) => {
    const { emails } = req.body;

    if (!emails || !Array.isArray(emails)) {
        return res.status(400).send({ message: "Invalid email list" });
    }

    try {
        const users = await User.find({ email: { $in: emails } }).select("_id email");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send({ message: "Error resolving emails", error: error.message });
    }
});

export  {
    accessChat,
    fetchChats,
    createGroupChat,
    addToGroup,
    removeFromGroup,
    resolveEmails
}