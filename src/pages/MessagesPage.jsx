import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
  sendPersonalMessage,
  setActiveConversation,
  clearActiveConversation,
  setPersonalReplyTo,
  clearPersonalReplyTo,
  setCurrentOpenedConversationWindow,
  clearCurrentOpenedConversationWindow,
} from "../features/personal/personalSlice";
import { generateConversationId } from "../utils/helpers";

import AppShell from "../components/layout/AppShell";
import MessageInput from "../components/chat/MessageInput";
import ConversationList from "../components/chat/ConversationList";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessageArea from "../components/chat/ChatMessageArea";
import NoChatSelected from "../components/chat/NoChatSelected";
import { useEffect, useRef } from "react";

export default function MessagesPage() {
  const dispatch = useDispatch();
  const { userId, username } = useSelector((s) => s.user);
  const { conversations, activeConversationId, activeRecipient, replyTo } =
    useSelector((s) => s.personal);
  const prevActiveIdRef = useRef(activeConversationId);

  const activeMessages = activeConversationId
    ? conversations[activeConversationId] || []
    : [];

  const conversationList = Object.entries(conversations).map(([id, msgs]) => ({
    id,
    lastMessage: msgs[msgs.length - 1],
  }));

  useEffect(() => {
    const prevId = prevActiveIdRef.current;

    if (prevId && !activeConversationId) {
      dispatch(clearCurrentOpenedConversationWindow());
    }

    prevActiveIdRef.current = activeConversationId;
  }, [activeConversationId, dispatch]);

  const handleStartNewConversation = (recipientId, recipientUsername) => {
    const convId = generateConversationId(userId, recipientId);
    dispatch(
      setActiveConversation({
        conversationId: convId,
        recipient: {
          userId: recipientId,
          username: recipientUsername || recipientId,
        },
      }),
    );
  };

  const handleSelectConversation = (convId, recipientId, recipientName) => {
    dispatch(
      setActiveConversation({
        conversationId: convId,
        recipient: { userId: recipientId, username: recipientName },
      }),
    );
    dispatch(setCurrentOpenedConversationWindow(convId));
  };

  const handleSend = async ({ text, file, replyTo }) => {
    if (!activeConversationId || !activeRecipient) return;

    // const fd = new FormData();
    // fd.append("conversationId", activeConversationId);
    // fd.append("senderId", userId);
    // fd.append("username", username);
    // fd.append("messageId", uuidv4());
    // fd.append("to", activeRecipient.userId);
    // fd.append("from", userId);
    // if (text) fd.append("content", text);
    // if (file) fd.append("file", file);
    // if (reply) fd.append("replyTo", JSON.stringify(reply));

    const newMessage = {
      conversationId: activeConversationId,
      senderId: userId,
      username: username,
      messageId: uuidv4(),
      to: activeRecipient.userId,
      from: userId,
      content: text,
      replyTo,
    };

    console.log("newMessage", newMessage);

    const result = await dispatch(sendPersonalMessage(newMessage));
    if (result.meta.requestStatus === "fulfilled") {
      dispatch({
        type: "personal/receivePersonalMessage",
        payload: { ...result.payload, conversationId: activeConversationId },
      });
    }
    dispatch(clearPersonalReplyTo());
  };

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <AppShell>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
          bgcolor: "background.default",
        }}
      >
        {/* Left — conversation list */}
        <ConversationList
          conversations={conversationList}
          activeConversationId={activeConversationId}
          currentUserId={userId}
          hidden={!!activeConversationId}
          onSelectConversation={handleSelectConversation}
          onStartNewConversation={handleStartNewConversation}
        />

        {/* Right — chat viewport */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            width: { xs: activeConversationId ? "100%" : 0, md: "auto" },
            bgcolor: "background.default",
            position: "relative",
          }}
        >
          {activeConversationId ? (
            <>
              <ChatHeader
                recipient={activeRecipient}
                onBack={() => dispatch(clearActiveConversation())}
              />

              <ChatMessageArea
                messages={activeMessages}
                currentUserId={userId}
                onReply={(msg) => dispatch(setPersonalReplyTo(msg))}
              />

              <Box
                sx={{
                  bgcolor: "background.default",
                  p: 1.5,
                  borderTop: "1px solid",
                  borderColor: "divider",
                }}
              >
                <MessageInput
                  onSend={handleSend}
                  replyTo={replyTo}
                  onCancelReply={() => dispatch(clearPersonalReplyTo())}
                  placeholder="Type a message"
                />
              </Box>
            </>
          ) : (
            <NoChatSelected />
          )}
        </Box>
      </Box>
    </AppShell>
  );
}
