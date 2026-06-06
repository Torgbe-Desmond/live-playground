import React, { useState, useRef } from "react";
import {
  Box,
  TextField,
  IconButton,
  Tooltip,
  Typography,
  Chip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ReplyIcon from "@mui/icons-material/Reply";

export default function MessageInput({
  onSend,
  sending,
  replyTo,
  onCancelReply,
  placeholder = "Type a message…",
}) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const fileRef = useRef();

  const handleSend = () => {
    if (!text.trim() && !file) return;
    onSend({ text: text.trim(), file, replyTo });
    setText("");
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isButtonActive = !sending && (text.trim() || file);

  return (
    <Box 
      sx={{ 
        p: { xs: 1.5, md: 2 }, 
        borderColor: "divider",
        backdropFilter: "blur(10px)" 
      }}
    >
      {/* Reply preview section */}
      {replyTo && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1,
            px: 1.5,
            py: 0.8,
            borderRadius: 2,
            borderLeft: "3px solid",
            borderColor: "primary.main",
            bgcolor: "divider",
          }}
        >
          <ReplyIcon sx={{ fontSize: 16 }} color="primary" />
          <Box sx={{ flex: 1, overflow: "hidden" }}>
            <Typography variant="caption" color="primary.main" sx={{ display: "block" }}>
              {replyTo.username}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
            >
              {replyTo.content || (replyTo.files?.length ? "📎 File" : "")}
            </Typography>
          </Box>
          <IconButton size="small" onClick={onCancelReply} sx={{ p: 0.3 }}>
            <CloseIcon sx={{ fontSize: 14 }} color="action" />
          </IconButton>
        </Box>
      )}

      {/* File attachment preview pill */}
      {file && (
        <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Chip
            label={file.name}
            size="small"
            variant="outlined"
            onDelete={() => {
              setFile(null);
              if (fileRef.current) fileRef.current.value = "";
            }}
            sx={{
              maxWidth: 220,
              borderColor: "primary.light",
              color: "primary.main",
              "& .MuiChip-label": { overflow: "hidden", textOverflow: "ellipsis" },
            }}
          />
        </Box>
      )}

      <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1 }}>
        {/* File attachment system trigger */}
        {/* <Tooltip title="Attach file">
          <IconButton
            onClick={() => fileRef.current?.click()}
            color="primary"
            sx={{ flexShrink: 0 }}
          >
            <AttachFileIcon />
          </IconButton>
        </Tooltip> */}
        <input
          ref={fileRef}
          type="file"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0] || null)}
        />

        {/* Messaging Multi-line Input Box — layout radiuses match theme specifications cleanly */}
        <TextField
          fullWidth
          multiline
          maxRows={4}
          placeholder={placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKey}
          disabled={sending}
          size="small"
        />

        {/* Form Submission Action Hub */}
        <Tooltip title="Send">
          <span>
            <IconButton
              onClick={handleSend}
              disabled={!isButtonActive}
              sx={{
                width: 42,
                height: 42,
                flexShrink: 0,
                borderRadius: "10px", // Complements standard theme button rounding architectures
                transition: "all 0.2s ease",
                // Inherits standard linear-gradients mapped via your contained primary style configs
                background: (theme) => isButtonActive 
                  ? theme.components.MuiButton.styleOverrides.containedPrimary.background 
                  : theme.palette.divider,
                color: isButtonActive ? "primary.contrastText" : "text.secondary",
                "&:hover": {
                  background: (theme) => isButtonActive 
                    ? theme.components.MuiButton.styleOverrides.containedPrimary["&:hover"].background 
                    : theme.palette.divider,
                },
              }}
            >
              <SendIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    </Box>
  );
}