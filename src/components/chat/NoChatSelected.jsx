import { Box, Typography } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

export default function NoChatSelected() {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.paper",
        p: 3,
      }}
    >
      <Box sx={{ textAlign: "center", maxWidth: 360, opacity: 0.6 }}>
        <ChatBubbleOutlineIcon sx={{ fontSize: 80, color: "primary.main", mb: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          LiveShare Web
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Select an active chat room or look up user accounts from your direct
          message sidebar menu options.
        </Typography>
      </Box>
    </Box>
  );
}
