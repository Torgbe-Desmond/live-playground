import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar,
  Chip,
  Badge, // ← Added
} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const navItems = [
  { label: "Home", icon: <HomeIcon />, path: "/home" },
  { label: "Room Chat", icon: <MeetingRoomIcon />, path: "/room" },
  { label: "Messages", icon: <ChatBubbleOutlineIcon />, path: "/messages" },
];

export default function Sidebar({ onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, roomName } = useSelector((s) => s.user);
  const { unreadCounts } = useSelector((s) => s.personal);

  // Total unread messages
  const totalUnreadMessages = Object.values(unreadCounts || {}).reduce(
    (acc, curr) => {
      return acc + (typeof curr === "number" ? curr : 0);
    },
    0,
  );

  console.log("totalUnreadMessages", totalUnreadMessages);

  const handleNav = (path) => {
    navigate(path);
    onClose?.();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "surface.main",
      }}
    >
      {/* User profile metadata wrapper card */}
      <Box sx={{ px: 2, py: 2.5 }}>
        <Box
          sx={{
            p: 2,
            borderRadius: "10px",
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: "primary.dark",
                color: "primary.contrastText",
                fontWeight: "bold",
              }}
            >
              {username?.[0]?.toUpperCase()}
            </Avatar>
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", color: "text.primary" }}
              >
                {username}
              </Typography>
              <Typography
                variant="caption"
                color="success.main"
                sx={{ fontWeight: "bold" }}
              >
                Active
              </Typography>
            </Box>
          </Box>

          {roomName && (
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                mb={0.5}
              >
                Your room code
              </Typography>
              <Chip
                label={roomName}
                size="small"
                variant="outlined"
                sx={{
                  ml: 1,
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  letterSpacing: "0.12em",
                  bgcolor: "surface.main",
                  color: "primary.main",
                  borderColor: "primary.light",
                  fontSize: "0.85rem",
                }}
              />
            </Box>
          )}
        </Box>
      </Box>

      <Divider />

      {/* Navigation Links */}
      <List sx={{ px: 1.5, py: 1 }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          const isMessages = item.label === "Messages";

          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={active}
                onClick={() => handleNav(item.path)}
                sx={{
                  py: 1.2,
                  "&:hover": {
                    bgcolor: "divider",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 38,
                    color: active ? "primary.main" : "text.secondary",
                  }}
                >
                  {isMessages ? (
                    <Badge
                      badgeContent={
                        totalUnreadMessages > 0 ? totalUnreadMessages : null
                      }
                      color="error"
                      sx={{
                        "& .MuiBadge-badge": {
                          fontSize: "0.75rem",
                          fontWeight: 600,
                        },
                      }}
                    >
                      {item.icon}
                    </Badge>
                  ) : (
                    item.icon
                  )}
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: "0.9rem",
                    color: active ? "primary.main" : "text.primary",
                    variant: active ? "button" : "body1",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      {/* System Footer Strip */}
      <Box sx={{ p: 2 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          align="center"
          display="block"
        >
          Rooms auto-delete when empty
        </Typography>
      </Box>
    </Box>
  );
}
