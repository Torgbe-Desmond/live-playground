import React from "react";
import { Box, Typography, Avatar, Tooltip, IconButton } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { formatTime } from "../../utils/helpers";

export default function MessageBubble({ msg, isOwn, onReply }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isOwn ? "flex-end" : "flex-start",
        mb: 1.5,
        px: 1,
        "&:hover .msg-actions": { opacity: 1 },
      }}
    >
      {!isOwn && (
        <Avatar
          sx={{
            width: 30,
            height: 30,
            bgcolor: "primary.dark",
            color: "primary.contrastText",
            mr: 1,
            mt: 0.5,
            flexShrink: 0,
          }}
        >
          {msg.username?.[0]?.toUpperCase() || "?"}
        </Avatar>
      )}

      <Box
        sx={{
          maxWidth: "72%",
          display: "flex",
          flexDirection: "column",
          alignItems: isOwn ? "flex-end" : "flex-start",
        }}
      >
        {!isOwn && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 0.5, ml: 0.5 }}
          >
            {msg.username}
          </Typography>
        )}

        {/* Reply reference */}
        {msg.replyTo?.content && (
          <Box
            sx={{
              px: 1.5,
              py: 1,
              mb: 0.5,
              borderRadius: 2,
              borderLeft: "3px solid",
              borderColor: "primary.main",
              bgcolor: "divider",
              maxWidth: "100%",
            }}
          >
            <Typography
              variant="caption"
              color="primary.main"
              sx={{ display: "block" }}
            >
              {msg.replyTo.username}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {msg.replyTo.content ||
                (msg.replyTo.files?.length ? "📎 File" : "")}
            </Typography>
          </Box>
        )}

        {/* Bubble wrapper container context */}
        <Box
          sx={{
            px: 2,
            py: 1.2,
            borderRadius: isOwn ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
            // Leverages theme primary styles or clean surface background tokens contextually
            background: (theme) =>
              isOwn
                ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`
                : theme.palette.surface.main,
            border: isOwn ? "none" : "1px solid",
            borderColor: "divider",
            minWidth: 60,
          }}
        >
          {msg.content && (
            <Typography
              variant="body1"
              sx={{
                wordBreak: "break-word",
                color: isOwn ? "primary.contrastText" : "text.primary",
              }}
            >
              {msg.content}
            </Typography>
          )}
        </Box>

        {/* Footer info strip */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.3 }}>
          <Typography variant="caption" color="text.secondary">
            {formatTime(msg.createdAt || msg.timestamp)}
          </Typography>
          <Box
            className="msg-actions"
            sx={{
              opacity: 0,
              transition: "opacity 0.15s",
              display: "flex",
              gap: 0.3,
            }}
          >
            <Tooltip title="Reply">
              <IconButton
                size="small"
                onClick={() => onReply?.(msg)}
                sx={{ p: 0.4 }}
              >
                <ReplyIcon fontSize="inherit" color="primary" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
