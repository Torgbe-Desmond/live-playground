import { useState, useMemo } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
  sendMessage,
  setReplyTo,
  clearReplyTo,
  clearMessages,
} from "../features/chat/chatSlice";
import { setCurrentRoom, leaveRoom } from "../features/room/roomSlice";
import {
  setActiveConversation,
  setCurrentOpenedConversationWindow,
} from "../features/personal/personalSlice";
import { getSocket } from "../services/socket";
import { generateConversationId } from "../utils/helpers";

import AppShell from "../components/layout/AppShell";
import JoinRoomPanel from "../components/room/JoinRoomPanel";
import RoomHeader from "../components/room/RoomHeader";
import RoomInfoDrawer from "../components/room/RoomInfoDrawer";
import MessageBoard from "../components/room/MessageBoard";
import MessageComposer from "../components/room/MessageComposer";
import { useNavigate } from "react-router-dom";

export default function RoomPage() {
  const dispatch = useDispatch();
  const { userId, username, roomName: myRoomCode } = useSelector((s) => s.user);
  const { currentRoom, roomSize, peopleConnected } = useSelector((s) => s.room);
  const { messages, sending, replyTo } = useSelector((s) => s.chat);
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const otherMembers = useMemo(() => {
    if (!Array.isArray(peopleConnected)) return [];
    return peopleConnected.filter((p) => p.userId !== userId);
  }, [peopleConnected, userId]);

  const handleJoin = (code) => {
    const roomToJoin = (code ?? myRoomCode).trim().toUpperCase();
    if (!roomToJoin) return;

    const socket = getSocket();
    if (!socket) return;

    dispatch(clearMessages());
    dispatch(setCurrentRoom(roomToJoin));
    socket.emit("joinRoom", { roomName: roomToJoin, userId, username });
  };

  const handleLeave = () => {
    const socket = getSocket();
    if (socket && currentRoom) {
      socket.emit("leaveRoom", { roomName: currentRoom, userId, username });
    }
    dispatch(leaveRoom());
    dispatch(clearMessages());
  };

  const handleStartConversation = (member) => {
    const convId = generateConversationId(userId, member.userId);
    dispatch(
      setActiveConversation({
        conversationId: convId,
        recipient: { userId: member.userId, username: member.username },
      }),
    );
    dispatch(setCurrentOpenedConversationWindow(convId));
    navigate("/messages");
  };

  const handleSend = async ({ text, file, replyTo }) => {
    if (!currentRoom) return;

    const newMessage = {
      roomName: currentRoom,
      senderId: userId,
      username: username,
      messageId: uuidv4(),
      content: text,
      replyTo,
    };

    await dispatch(sendMessage(newMessage));
    dispatch(clearReplyTo());
  };

  // ── Render ───────────────────────────────────────────────────────────────────

  if (!currentRoom) {
    return (
      <AppShell>
        <JoinRoomPanel myRoomCode={myRoomCode} onJoin={handleJoin} />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          bgcolor: "background.default",
        }}
      >
        <RoomHeader
          currentRoom={currentRoom}
          roomSize={roomSize}
          onOpenInfo={() => setDrawerOpen(true)}
          onLeave={handleLeave}
        />

        <RoomInfoDrawer
          open={drawerOpen}
          members={otherMembers}
          onClose={() => setDrawerOpen(false)}
          onStartConversation={handleStartConversation}
        />

        <MessageBoard
          messages={messages}
          currentUserId={userId}
          onReply={(msg) => dispatch(setReplyTo(msg))}
        />

        <MessageComposer
          sending={sending}
          replyTo={replyTo}
          onSend={handleSend}
          onCancelReply={() => dispatch(clearReplyTo())}
        />
      </Box>
    </AppShell>
  );
}
