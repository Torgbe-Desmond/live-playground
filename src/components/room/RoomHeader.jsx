import { Box, Typography, Avatar, Button } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";

export default function RoomHeader({
  currentRoom,
  roomSize,
  onOpenInfo,
  onLeave,
}) {
  return (
    <Box
      sx={{
        px: 3,
        py: 1,
        display: "flex",
        alignItems: "center",
        gap: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      {/* Clickable room identity — opens the info drawer */}
      <Box
        onClick={onOpenInfo}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flex: 1,
          cursor: "pointer",
          "&:hover": { opacity: 0.8 },
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: "primary.main",
            color: "primary.contrastText",
          }}
        >
          <GroupIcon />
        </Avatar>

        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              fontFamily: "monospace",
              letterSpacing: "0.05em",
              lineHeight: 1.2,
            }}
          >
            Room #{currentRoom}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 0.25, display: "block" }}
          >
            {roomSize} members online · Click to view info
          </Typography>
        </Box>
      </Box>

      <Button
        size="small"
        variant="text"
        color="error"
        startIcon={<LogoutIcon />}
        onClick={onLeave}
        sx={{ fontWeight: "bold" }}
      >
        Leave
      </Button>
    </Box>
  );
}
