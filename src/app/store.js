import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import roomReducer from "../features/room/roomSlice";
import chatReducer from "../features/chat/chatSlice";
import personalReducer from "../features/personal/personalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    chat: chatReducer,
    personal: personalReducer,
  },
});
