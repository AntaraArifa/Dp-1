import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useGetAllUserChats from "@/hooks/useGetAllUserChats";
import { setSelectedChat } from "@/redux/chatSlice";
import AddMembersDialog from "../AddMembersDialog";
import CreateGroupChatDialog from "../CreateGroupChatDialog"; // Import the dialog

const ChatList = ({ onChatSelect }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedChats, setSearchedChats] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [isGroupChatDialogOpen, setIsGroupChatDialogOpen] = useState(false); 
  const loggedInUserId = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();

  useGetAllUserChats();

  const allChats = useSelector((store) => store.chat.allChats);
  const searchStatus = useSelector((store) => store.chat.status);

  const handleSearch = () => {
    if (!searchText.trim()) {
      setSearchedChats(null);
      return;
    }

    const results = Array.isArray(allChats?.chats)
      ? allChats.chats.filter((chat) => {
          if (chat.isGroupChat) {
            return chat.chatName
              ?.toLowerCase()
              .includes(searchText.toLowerCase());
          } else {
            const recipient = chat.users.find(
              (user) => user._id !== loggedInUserId
            );
            return recipient?.email
              ?.toLowerCase()
              .includes(searchText.toLowerCase());
          }
        })
      : [];
    setSearchedChats({ chats: results });
  };

  const handleChatSelect = (chat) => {
    dispatch(setSelectedChat(chat));
    onChatSelect(chat);
  };

  const chatsToDisplay = searchedChats || allChats;

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
    setSearchedChats((prev) => ({
      chats: prev?.chats ? [newChat, ...prev.chats] : [newChat],
    }));
    setIsGroupChatDialogOpen(false);
  };

  return (
    <div className="w-1/3 border-r h-screen bg-white">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Chats</h2>
        <button
          onClick={openCreateGroupChatDialog}
          className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Group
        </button>
      </div>

      <div className="p-4 border-b flex items-center">
        <input
          type="text"
          placeholder="Search chats"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full p-2 rounded border"
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Search
        </button>
      </div>

      {searchStatus === "loading" && (
        <div className="p-4 text-center text-gray-500">Loading chats...</div>
      )}
      {searchStatus === "failed" && (
        <div className="p-4 text-center text-red-500">
          Failed to load chats. Please try again.
        </div>
      )}

      <ul>
        {chatsToDisplay?.chats.map((chat) => {
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
              <img
                src={
                  chat.isGroupChat
                    ? "/group-avatar.png"
                    : recipient?.profile?.profilePhoto || "/default-avatar.png"
                }
                alt="Chat Avatar"
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex-1">
                <p className="font-bold">{chatName}</p>
                <p className="text-gray-500 text-sm truncate">
                  {chat.latestMessage
                    ? `${chat.latestMessage.sender.fullname || "Unknown"}: ${
                        chat.latestMessage.content || "No content"
                      }`
                    : "No messages yet"}
                </p>
              </div>
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
            </li>
          );
        })}
      </ul>

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
