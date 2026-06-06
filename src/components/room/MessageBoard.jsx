import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import MessageBubble from "../chat/MessageBubble";

export default function MessageBoard({ messages, currentUserId, onReply }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        px: 3,
        py: 2,
        bgcolor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(10,10,15,0.4)"
            : "rgba(240,242,245,0.6)",
        "&::-webkit-scrollbar": { width: 6 },
        "&::-webkit-scrollbar-thumb": { bgcolor: "divider", borderRadius: 4 },
      }}
    >
      {messages.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            opacity: 0.4,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No active messages recorded. Drop a comment first!
          </Typography>
        </Box>
      ) : (
        messages.map((msg, i) => (
          <MessageBubble
            key={msg.messageId || i}
            msg={msg}
            isOwn={msg.senderId === currentUserId}
            onReply={onReply}
          />
        ))
      )}
      <div ref={bottomRef} />
    </Box>
  );
}
