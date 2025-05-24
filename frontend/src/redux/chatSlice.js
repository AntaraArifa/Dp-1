import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        allChats: [],
        selectedChat: null,
        searchChatText: "",
    },
    reducers: {
        setAllChats: (state, action) => {
            state.allChats = action.payload;
        },
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload;
        },
        setSearchChatText: (state, action) => {
            state.searchChatText = action.payload;
        },
        clearSelectedChat: (state) => {
            state.selectedChat = null;
        },
        updateLatestMessage: (state, action) => {
            const { chatId, latestMessage } = action.payload;
            const chatIndex = state.allChats.chats?.findIndex(chat => chat._id === chatId);
            if (chatIndex !== -1) {
                state.allChats.chats[chatIndex].latestMessage = latestMessage;

                const updatedChat = state.allChats.chats.splice(chatIndex, 1)[0];
                state.allChats.chats.unshift(updatedChat);
            }
        }

    },
});

export const {
    setAllChats,
    setSelectedChat,
    setSearchChatText,
    clearSelectedChat,
    updateLatestMessage
} = chatSlice.actions;

export default chatSlice.reducer;
