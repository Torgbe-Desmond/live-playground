import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  InputAdornment,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import ForumIcon from "@mui/icons-material/Forum";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userId } = useSelector((s) => s.user);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (userId) navigate("/home");
  }, [userId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    dispatch(registerUser(username.trim()));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={1}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: "8px",
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          textAlign: "center",
        }}
      >
        {/* Web App Brand Header Row */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5, mb: 4 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              bgcolor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ForumIcon sx={{ color: "primary.contrastText", fontSize: 28 }} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, trackingSpacing: "-0.02em" }}>
              LiveShare Messenger
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Open-Source Realtime Messaging Network
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, px: 1 }}>
          Create your screen user identity profile tag below to provision transient room allocations automatically.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3, textAlign: "left", borderRadius: "6px" }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            placeholder="Choose Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2.5 }}
          />
          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            disabled={loading || !username.trim()}
            sx={{ py: 1.4, fontSize: "0.95rem", fontWeight: "bold", borderRadius: "6px" }}
          >
            {loading ? <CircularProgress size={22} color="inherit" /> : "Agree & Continue"}
          </Button>
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ mt: 4, display: "block" }}>
          End-to-end sessions discard automatically when empty.
        </Typography>
      </Paper>
    </Box>
  );
}