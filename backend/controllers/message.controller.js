import expressAsyncHandler from "express-async-handler";
import Message from "../models/message.model.js";
import { User } from "../models/user.model.js";
import Chat from "../models/chat.model.js";


const allMessages = expressAsyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "fullname profile.profilePhoto email")
      .populate("chat");
    const latestMessage = messages[messages.length - 1];
    if (latestMessage && !latestMessage.readBy.includes(req.id)) {
      latestMessage.readBy.push(req.id);
      await latestMessage.save();
    }
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendMessage = expressAsyncHandler(async (req, res) => {
  const { content, chat } = req.body;

  if (!content || !chat) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.id,
    content: content,
    chat: chat,
    readBy: [req.id], 
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "fullname profile.profilePhoto");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "fullname profile.profilePhoto email",
    });

    await Chat.findByIdAndUpdate(req.body.chat, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export { allMessages, sendMessage }