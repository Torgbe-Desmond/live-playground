import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const sendPersonalMessage = createAsyncThunk(
  "personal/send",
  async (newMessage, { rejectWithValue }) => {
    try {
      const res = await api.post("/messages/personal", newMessage, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to send");
    }
  },
);

const personalSlice = createSlice({
  name: "personal",
  initialState: {
    conversations: {},
    activeConversationId: null,
    activeRecipient: null,
    currentConversationWindow: null,
    unreadCounts: {},
    sending: false,
    replyTo: null,
    error: null,
  },
  reducers: {
    receivePersonalMessage: (state, action) => {
      const msg = action.payload;
      const id = msg.conversationId;
      if (!state.conversations[id]) {
        state.conversations[id] = [];
      }
      state.conversations[id].push(msg);
    },
    receiveOtherMessage: (state, action) => {
      const msg = action.payload;
      const id = msg.conversationId;

      // Check if conversation exist
      if (!state.conversations[id]) {
        state.conversations[id] = [];
      }
      // Check if the unread count for the current conversation is initialized
      if (!state.unreadCounts[id]) {
        state.unreadCounts[id] = 0;
      }
      
      // Check if the message received is from a currently open window
      if (state.currentConversationWindow == null) {
        state.unreadCounts[id] = state.unreadCounts[id] + 1;
      }

      state.conversations[id].push(msg);
    },
    receiveOwnMessage: (state, action) => {
      const msg = action.payload;
      const id = msg.conversationId;

      // Check if conversation exist
      if (!state.conversations[id]) {
        state.conversations[id] = [];
      }
      state.conversations[id].push(msg);
    },
    setActiveConversation: (state, action) => {
      state.activeConversationId = action.payload.conversationId;
      state.activeRecipient = action.payload.recipient;
    },
    setCurrentOpenedConversationWindow: (state, action) => {
      state.currentConversationWindow = action.payload;
    },
    clearCurrentOpenedConversationWindow: (state, action) => {
      state.currentConversationWindow = null;
    },
    setMessageUnreadCount: (state, action) => {
      const id = action.payload;
      const currentConversationId = state.activeConversationId;
      if (currentConversationId && currentConversationId !== id) {
        if (!state.unreadCounts[id]) {
          state.unreadCounts[id] = 0;
        }
        state.unreadCounts[id] = state.unreadCounts[id] + 1;
      }
    },
    clearMessageUnreadCountForOpenedChat: (state, action) => {
      const id = action.payload;
      const currentConversationId = state.activeConversationId;
      if (currentConversationId && currentConversationId !== id) {
        if (!state.unreadCounts[id]) {
          state.unreadCounts[id] = 0;
        }
        state.unreadCounts[id] = 0;
      }
    },
    clearActiveConversation: (state) => {
      state.activeConversationId = null;
      state.activeRecipient = null;
    },
    markAsRead: (state, action) => {
      const conversationId = action.payload;
      const messages = state.conversations[conversationId];

      if (!Array.isArray(messages)) return;

      messages.forEach((message) => {
        if (!message.isRead) {
          message.isRead = true;
        }
      });

      state.unreadCounts[conversationId] = 0;
    },
    setPersonalReplyTo: (state, action) => {
      state.replyTo = action.payload;
    },
    clearPersonalReplyTo: (state) => {
      state.replyTo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendPersonalMessage.pending, (state) => {
        state.sending = true;
      })
      .addCase(sendPersonalMessage.fulfilled, (state) => {
        state.sending = false;
      })
      .addCase(sendPersonalMessage.rejected, (state, action) => {
        state.sending = false;
        state.error = action.payload;
      });
  },
});

export const {
  markAsRead,
  clearMessageUnreadCountForOpenedChat,
  setCurrentOpenedConversationWindow,
  clearCurrentOpenedConversationWindow,
  setMessageUnreadCount,
  receivePersonalMessage,
  receiveOtherMessage,
  receiveOwnMessage,
  setActiveConversation,
  clearActiveConversation,
  setPersonalReplyTo,
  clearPersonalReplyTo,
} = personalSlice.actions;
export default personalSlice.reducer;
