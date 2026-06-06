import { Box, Grid, Paper, Typography } from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AppShell from "../components/layout/AppShell";
import WelcomeBanner from "../components/home/WelcomeBanner";
import RoomCodeCard from "../components/home/RoomCodeCard";
import FeatureChips from "../components/home/FeatureChips";

export default function HomePage() {
  const { username, roomName } = useSelector((s) => s.user);
  const navigate = useNavigate();

  return (
    <AppShell>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: { xs: 2, md: 4 },
          bgcolor: "background.default",
        }}
      >
        <WelcomeBanner username={username} />

        <RoomCodeCard roomCode={roomName} />

        {/* Navigation Action Layout Grid */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "12px",
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "surface.main",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  borderColor: "primary.main",
                  transform: "translateY(-2px)",
                  boxShadow: (theme) =>
                    theme.shadows[4] || "0 8px 24px rgba(0,0,0,0.1)",
                },
              }}
              onClick={() => navigate("/room")}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: "rgba(108, 99, 255, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MeetingRoomIcon color="primary" />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Room Chat
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Join or create a room and chat with multiple people. Share
                files, reply to messages, and more.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper
            
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "12px",
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "surface.main",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  borderColor: "secondary.main",
                  transform: "translateY(-2px)",
                  boxShadow: (theme) =>
                    theme.shadows[4] || "0 8px 24px rgba(0,0,0,0.1)",
                },
              }}
              onClick={() => navigate("/messages")}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: "rgba(244, 63, 94, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ChatBubbleOutlineIcon color="secondary" />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Direct Messages
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Send private messages and files directly to another user.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <FeatureChips />
      </Box>
    </AppShell>
  );
}
