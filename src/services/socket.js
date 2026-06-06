import { io } from "socket.io-client";
import { baseURL } from "./api";

let socket = null;

export const getSocket = () => socket;

export const connectSocket = (userId, username) => {
  if (socket?.connected) return socket;

  socket = io(baseURL, {
    query: { userId, username },
    transports: ["websocket"],
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
