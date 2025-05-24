import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedChat } from "@/redux/chatSlice";
import useGetAllUserChats from "@/hooks/useGetAllUserChats";
import AddMembersDialog from "../AddMembersDialog";
import CreateGroupChatDialog from "../CreateGroupChatDialog";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";


const ChatList = ({ onChatSelect }) => {
  const [searchText, setSearchText] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [isGroupChatDialogOpen, setIsGroupChatDialogOpen] = useState(false);

  const loggedInUserId = useSelector((store) => store.auth.user?._id);
  const allChats = useSelector((store) => store.chat.allChats);
  const selectedChat = useSelector((store) => store.chat.selectedChat);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch all user chats
  useGetAllUserChats();

  const handleChatSelect = (chat) => {
    if (!chat) return;
    dispatch(setSelectedChat(chat));
    if (onChatSelect) onChatSelect(chat);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setDialogType(null);
    setSelectedChatId(null);
  };

  const openAddMembersDialog = (chatId) => {
    setSelectedChatId(chatId);
    setDialogType("addMembers");
    setIsDialogOpen(true);
  };

  const openCreateGroupChatDialog = () => {
    setIsGroupChatDialogOpen(true);
  };

  const handleNewGroupChat = (newChat) => {
    dispatch({
      type: "chat/addChat",
      payload: newChat,
    });
    setIsGroupChatDialogOpen(false);
  };

  // Dynamically filter chats based on search input and `allChats`
  const filteredChats = React.useMemo(() => {
    if (!searchText.trim()) return allChats?.chats || [];
    return allChats?.chats?.filter((chat) => {
      if (chat.isGroupChat) {
        return chat.chatName?.toLowerCase().includes(searchText.toLowerCase());
      } else {
        const recipient = chat.users.find((user) => user._id !== loggedInUserId);
        return recipient?.fullname?.toLowerCase().includes(searchText.toLowerCase());
      }
    }) || [];
  }, [searchText, allChats, loggedInUserId]);

  return (
    <div className="w-1/3 border-r h-screen bg-white">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-black font-medium"
        >
          ← Back
        </button>
        <h2 className="text-lg font-semibold">Chats</h2>
        <button
          onClick={openCreateGroupChatDialog}
          className="flex items-center gap-2 text-white bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-600"
          title="Create Group"
        >
          <Plus className="w-5 h-5" />
          <span>Create Group</span>
        </button>

      </div>

      {/* Search Bar */}
      <div className="p-4 border-b flex items-center">
        <input
          type="text"
          placeholder="Search chats"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full p-2 rounded border"
        />
      </div>

      {/* Chat List */}
      <ul>
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => {
            const recipient = chat.isGroupChat
              ? null
              : chat.users.find((user) => user._id !== loggedInUserId);

            const chatName = chat.isGroupChat
              ? chat.chatName
              : recipient?.fullname || recipient?.email || "Unknown Chat";

            return (
              <li
                key={chat._id}
                className="flex items-center p-4 cursor-pointer hover:bg-gray-100"
                onClick={() => handleChatSelect(chat)}
              >
                
                <div className="flex-1">
                  <p className="font-bold">{chatName}</p>
                  <p className="text-gray-500 text-sm truncate">
                    {chat.latestMessage
                      ? `${chat.latestMessage.sender.fullname || "Unknown"}: ${chat.latestMessage.content || "No content"
                      }`
                      : "No messages yet"}
                  </p>
                </div>
                {chat.isGroupChat && (
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openAddMembersDialog(chat._id);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ⋮
                    </button>
                  </div>
                )}
              </li>
            );
          })
        ) : (
          <div className="p-4 text-center text-gray-500">
            No chats available. Create a new chat or group.
          </div>
        )}
      </ul>

      {/* Dialogs */}
      {dialogType === "addMembers" && selectedChatId && (
        <AddMembersDialog
          open={isDialogOpen}
          setOpen={handleDialogClose}
          chatId={selectedChatId}
        />
      )}

      {isGroupChatDialogOpen && (
        <CreateGroupChatDialog
          open={isGroupChatDialogOpen}
          setOpen={setIsGroupChatDialogOpen}
          onChatCreated={handleNewGroupChat}
        />
      )}
    </div>
  );
};

export default ChatList;
