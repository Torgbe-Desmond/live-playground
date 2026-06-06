import { useState } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function RoomCodeCard({ roomCode }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: "12px",
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "surface.main",
      }}
    >
      <Typography variant="body2" color="text.secondary" mb={1}>
        Your Room Code
      </Typography>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}
      >
        <Typography
          variant="h3"
          fontFamily="monospace"
          letterSpacing="0.25em"
          sx={{
            fontWeight: "bold",
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {roomCode}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          startIcon={<ContentCopyIcon fontSize="small" />}
          onClick={handleCopy}
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </Box>
      <Typography
        variant="caption"
        color="text.secondary"
        mt={1}
        display="block"
      >
        Share this code so others can join your room
      </Typography>
    </Paper>
  );
}
