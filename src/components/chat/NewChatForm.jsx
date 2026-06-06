import { useState } from "react";
import { Box, TextField, IconButton, Typography } from "@mui/material";


export default function NewChatForm({ onStart, onCancel }) {
  const [recipientInput, setRecipientInput] = useState("");
  const [recipientUsername, setRecipientUsername] = useState("");

  const handleStart = () => {
    if (!recipientInput.trim()) return;
    onStart(recipientInput.trim(), recipientUsername.trim());
    setRecipientInput("");
    setRecipientUsername("");
  };

  return (
    <Box
      sx={{
        p: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.default",
      }}
    >
      <TextField
        fullWidth
        size="small"
        placeholder="Recipient User ID"
        value={recipientInput}
        onChange={(e) => setRecipientInput(e.target.value)}
        sx={{ mb: 1, bgcolor: "background.paper" }}
      />
      <TextField
        fullWidth
        size="small"
        placeholder="Username (Optional)"
        value={recipientUsername}
        onChange={(e) => setRecipientUsername(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleStart()}
        sx={{ mb: 1.5, bgcolor: "background.paper" }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <IconButton
          size="small"
          onClick={onCancel}
          sx={{ px: 2, borderRadius: 1 }}
        >
          <Typography variant="caption">Cancel</Typography>
        </IconButton>
        <IconButton
          size="small"
          disabled={!recipientInput.trim()}
          onClick={handleStart}
          sx={{
            px: 2,
            borderRadius: 1,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            "&:hover": { bgcolor: "primary.dark" },
            "&.Mui-disabled": { opacity: 0.4 },
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: "bold" }}>
            Start
          </Typography>
        </IconButton>
      </Box>
    </Box>
  );
}
