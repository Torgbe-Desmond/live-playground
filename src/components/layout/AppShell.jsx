import React, { useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Tooltip,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BoltIcon from "@mui/icons-material/Bolt";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../features/user/userSlice";
import { disconnectSocket } from "../../services/socket";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const DRAWER_WIDTH = 280;

export default function AppShell({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, roomName } = useSelector((s) => s.user);
  const { isConnected } = useSelector((s) => s.room);

  const handleLogout = () => {
    disconnectSocket();
    dispatch(clearUser());
    navigate("/");
  };

  const drawer = <Sidebar onClose={() => setMobileOpen(false)} />;

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden", bgcolor: "background.default" }}>
      {/* App Bar — Inherits base background colors and subtle border signatures from the theme */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          bgcolor: "background.paper",
          color: "text.primary",
          backdropFilter: "blur(20px)",
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={() => setMobileOpen(true)}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo Brand Frame */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                background: (theme) => theme.components.MuiButton.styleOverrides.containedPrimary.background,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BoltIcon sx={{ color: "primary.contrastText", fontSize: 18 }} />
            </Box>
            <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" }, color: "text.primary" }}>
              LiveShare
            </Typography>
            
            {/* Semantic Connection Status Chips relying completely on global success/error variables */}
            <Chip
              size="small"
              label={isConnected ? "Live" : "Offline"}
              color={isConnected ? "success" : "error"}
              variant="outlined"
              sx={{
                ml: 1,
                height: 20,
                fontSize: "0.65rem",
                bgcolor: isConnected ? "rgba(74, 222, 128, 0.12)" : "rgba(248, 113, 113, 0.12)",
              }}
            />
          </Box>

          {/* User Meta Actions Control Strip */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {roomName && (
              <Tooltip title="Your room code">
                <Chip
                  label={roomName}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontFamily: "monospace",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    color: "primary.main",
                    borderColor: "primary.light",
                    bgcolor: "surface.main",
                    letterSpacing: "0.1em",
                    display: { xs: "none", sm: "flex" },
                  }}
                />
              </Tooltip>
            )}
            
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: "primary.dark",
                color: "primary.contrastText",
                fontSize: "0.85rem",
                fontWeight: "bold",
              }}
            >
              {username?.[0]?.toUpperCase()}
            </Avatar>
            
            <Tooltip title="Sign out">
              <IconButton size="small" onClick={handleLogout} color="inherit">
                <LogoutIcon fontSize="small" sx={{ color: "text.secondary" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Layout Layer */}
      {!isMobile ? (
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              bgcolor: "surface.main",
              border: "none",
              borderRight: "1px solid",
              borderColor: "divider",
            },
          }}
        >
          {/* Top spacer to slide menu controls clearly below fixed App bar stack height */}
          <Toolbar /> 
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              bgcolor: "surface.main",
              border: "none",
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {/* Main Content Render Context */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}