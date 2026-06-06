import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, disconnectSocket, getSocket } from "../services/socket";
import {
  receiveMessage,
  setHistory,
} from "../features/chat/chatSlice";
import {
  receiveOtherMessage,
  receiveOwnMessage,
} from "../features/personal/personalSlice";
import {
  setRoomSize,
  setConnected,
  addToRoom,
  addNewPersonToRoom,
  removeLeftUser,
} from "../features/room/roomSlice";

export const useSocket = () => {
  const dispatch = useDispatch();
  const { userId, username } = useSelector((s) => s.user);
  const initialized = useRef(false);

  useEffect(() => {
    if (!userId || initialized.current) return;
    initialized.current = true;

    const socket = connectSocket(userId, username);

    socket.on("connect", () => {
      dispatch(setConnected(true));
    });

    socket.on("disconnect", () => {
      dispatch(setConnected(false));
    });

    socket.on("receiveMessage", (msg) => {
      dispatch(receiveMessage(msg));
    });

    socket.on("userJoined", (data) => {
      dispatch(addNewPersonToRoom(data));
    });

    socket.on("newlyJoinedUser", (data) => {
      dispatch(addToRoom(data));
    });

    socket.on("receivePersonalMessage", (msg) => {
      // Receiving my own messages
      if (msg.senderId === userId) {
        dispatch(receiveOwnMessage(msg));
      }

      // Receiving other peoples messages
      if (msg.senderId !== userId) {
        dispatch(receiveOtherMessage(msg));
      }
    });

    socket.on("roomHistory", (history) => {
      dispatch(setHistory(history));
    });

    socket.on("userLeft", (leftUser) => {
      dispatch(removeLeftUser(leftUser));
    });

    socket.on("roomSizeCount", ({ size }) => {
      dispatch(setRoomSize(size));
    });

    return () => {
      initialized.current = false;
      disconnectSocket();
      dispatch(setConnected(false));
    };
    // eslint-disable-next-line
  }, [userId]);

  return getSocket;
};
