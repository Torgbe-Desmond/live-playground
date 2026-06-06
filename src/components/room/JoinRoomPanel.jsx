import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  CircularProgress,
  Avatar,
} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";


export default function JoinRoomPanel({ myRoomCode, onJoin }) {
  const [joinCode, setJoinCode] = useState("");
  const [joining, setJoining] = useState(false);

  const handleJoin = async (code) => {
    const resolved = (code || joinCode).trim().toUpperCase();
    if (!resolved) return;
    setJoining(true);
    await onJoin(resolved);
    setJoining(false);
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        bgcolor: "background.default",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: "12px",
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Avatar
          sx={{ width: 60, height: 60, mx: "auto", mb: 2, bgcolor: "primary.main" }}
        >
          <MeetingRoomIcon sx={{ fontSize: 32, color: "primary.contrastText" }} />
        </Avatar>

        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Join Room Channel
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Enter an active 6-digit invitation access code to request connection
          entry.
        </Typography>

        <TextField
          fullWidth
          placeholder="000000"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
          slotProps={{
            htmlInput: {
              maxLength: 6,
              style: {
                fontFamily: "monospace",
                letterSpacing: "0.2em",
                fontWeight: "bold",
                fontSize: "1.4rem",
                textAlign: "center",
              },
            },
          }}
          onKeyDown={(e) => e.key === "Enter" && handleJoin()}
          sx={{ mb: 2 }}
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={() => handleJoin()}
          disabled={joining}
          sx={{ mb: 2, py: 1.2, fontWeight: "bold" }}
        >
          {joining ? <CircularProgress size={20} color="inherit" /> : "Join Chat Room"}
        </Button>

        <Divider sx={{ my: 2 }}>
          <Typography variant="caption" color="text.secondary">
            OR
          </Typography>
        </Divider>

        <Button
          fullWidth
          variant="outlined"
          size="large"
          onClick={() => handleJoin(myRoomCode)}
          sx={{ py: 1.2, fontWeight: "bold" }}
        >
          Open Shared Channel ({myRoomCode})
        </Button>
      </Paper>
    </Box>
  );
}
