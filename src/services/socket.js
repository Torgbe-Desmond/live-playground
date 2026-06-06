import { io } from "socket.io-client";

let socket = null;

export const getSocket = () => socket;

export const connectSocket = (userId, username) => {
  if (socket?.connected) return socket;

  socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:5000", {
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
