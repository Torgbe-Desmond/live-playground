import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (newMessage, { rejectWithValue }) => {
    try {
      const res = await api.post("/messages", newMessage, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to send");
    }
  },
);

export const downloadMedia = createAsyncThunk(
  "chat/downloadMedia",
  async ({ url, roomName, messageId }, { rejectWithValue }) => {
    try {
      const res = await api.post("/media/download", {
        url,
        roomName,
        messageId,
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Download failed");
    }
  },
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    sending: false,
    replyTo: null,
    error: null,
  },
  reducers: {
    receiveMessage: (state, action) => {
      const exists = state.messages.find(
        (m) => m.messageId === action.payload.messageId,
      );
      if (!exists) {
        state.messages.push(action.payload);
      }
    },
    setHistory: (state, action) => {
      state.messages = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    setReplyTo: (state, action) => {
      state.replyTo = action.payload;
    },
    clearReplyTo: (state) => {
      state.replyTo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.sending = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.sending = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sending = false;
        state.error = action.payload;
      });
  },
});

export const {
  receiveMessage,
  setHistory,
  clearMessages,
  setReplyTo,
  clearReplyTo,
} = chatSlice.actions;
export default chatSlice.reducer;
