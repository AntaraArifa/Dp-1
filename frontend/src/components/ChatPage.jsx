import React, { useState } from "react";
import ChatList from "../components/chat/ChatList";
import ChatBox from "../components/chat/ChatBox";
import Navbar from "./shared/Navbar";

const sampleChats = [
  {
    id: 1,
    name: "Jan Mayer",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastMessage: "We want to invite you for a quick interview",
    time: "12 mins ago",
    status: "Recruiter at Nomad",
    messages: [
      { sender: "Jan Mayer", content: "Hey, we saw your work...", time: "12 mins ago" },
      { sender: "You", content: "Sure, I would love to...", time: "12 mins ago" },
    ],
  },
  {
    id: 2,
    name: "Joe Bartmann",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Hey thanks for your interview...",
    time: "3:40 PM",
    status: "Recruiter at Tech",
  },
];

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(sampleChats[0]);

  return (
    <div className="flex h-screen">
      <ChatList chats={sampleChats} onChatSelect={setSelectedChat} />
      {selectedChat ? (
        <ChatBox selectedChat={selectedChat} />
      ) : (
        <div className="w-2/3 flex items-center justify-center text-gray-500">
          Select a chat to view messages
        </div>
      )}
    </div>
  );
};

export default ChatPage;
