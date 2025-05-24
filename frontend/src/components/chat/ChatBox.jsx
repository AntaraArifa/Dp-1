import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useGetAllChatMessages from "@/hooks/useGetAllChatMessages";
import axios from "axios";
import { CHAT_API_END_POINT } from "@/utils/constant";
import store from "@/redux/store";
import { setSelectedChat, updateLatestMessage } from "@/redux/chatSlice";
import { addMessage } from "@/redux/messageSlice";
import { LogOut, Send } from "lucide-react";


const ChatBox = () => {
  const loggedInUserId = useSelector((store) => store.auth.user);
  const selectedChat = useSelector((store) => store.chat.selectedChat);
  const { messages: initialMessages, loading, error } = useGetAllChatMessages(selectedChat);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [leaving, setLeaving] = useState(false);

  // Sync initial messages to local state
  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat?._id) {
      console.error("Missing required fields: message or chatId");
      return;
    }

    try {
      setSending(true);
      const response = await axios.post(
        `${CHAT_API_END_POINT}/chatsend`,
        { content: newMessage, chat: selectedChat._id },
        { withCredentials: true }
      );

      const sentMessage = response.data;

      // Update Redux store
      store.dispatch(addMessage(sentMessage));
      store.dispatch(updateLatestMessage({
        chatId: sentMessage.chat._id,
        latestMessage: sentMessage,
      }));



      // Update local messages state
      setMessages((prevMessages) => [...prevMessages, sentMessage]);

      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error.response?.data || error.message);
    } finally {
      setSending(false);
    }
  };

  const handleLeaveGroup = async () => {
    if (!selectedChat?._id) return;

    try {
      setLeaving(true);

      const response = await axios.put(
        `${CHAT_API_END_POINT}/groupremove`,
        {
          chatId: selectedChat._id,
          userId: loggedInUserId._id,
        },
        { withCredentials: true }
      );

      console.log("Left group successfully:", response.data);
      store.dispatch(setSelectedChat(null));
    } catch (error) {
      console.error("Failed to leave group:", error.response?.data || error.message);
    } finally {
      setLeaving(false);
    }
  };

  return (
    <div className="w-2/3 flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-bold">{selectedChat?.chatName || "Select a chat"}</h2>
        {selectedChat?.isGroupChat && (
          <button
            onClick={handleLeaveGroup}
            className={`flex items-center gap-2 px-4 py-2 text-white rounded ${leaving ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
              }`}
            disabled={leaving}
          >
            <LogOut className="w-4 h-4" />
            {leaving ? "Leaving..." : "Leave Group"}
          </button>
        )}

      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-blue-50">
        {loading ? (
          <p className="text-center text-gray-500">Loading messages...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex mb-4 ${msg.sender._id === loggedInUserId._id ? "justify-end" : "justify-start"}`}
            >
              {msg.sender._id !== loggedInUserId._id && (
                <img
                  src={msg.sender.profile.profilePhoto || "/default-avatar.png"}
                  alt={msg.sender.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <div
                className={`p-2 rounded ${msg.sender._id === loggedInUserId._id ? "bg-blue-400 ml-auto" : "bg-white"}`}
              >
                <p className="text-sm font-bold">{msg.sender.fullname}</p>
                <p>{msg.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages yet.</p>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t flex">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full py-1 px-1 rounded border mr-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={sending || !selectedChat}
        />
        <button
          onClick={handleSendMessage}
          className={`${sending ? "bg-gray-400 cursor-not-allowed" : "bg-transparent hover:bg-gray-200"} text-white p-2 rounded transition-colors duration-200`}
          disabled={sending || !selectedChat}
          title="Send"
        >
          <Send className={`w-5 h-5 ${sending ? "text-gray-700" : "text-green-500"}`} />
        </button>

      </div>
    </div>
  );
};

export default ChatBox;
