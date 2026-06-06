import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function RoomInfoDrawer({
  open,
  members,
  onClose,
  onStartConversation,
}) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: "100%", sm: 400 },
            bgcolor: "background.paper",
            borderLeft: "1px solid",
            borderColor: "divider",
            display: "flex",
            flexDirection: "column",
          },
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          bgcolor: "background.default",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <IconButton onClick={onClose} size="small" edge="start">
          <CloseIcon />
        </IconButton>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, flex: 1 }}>
          Room Info
        </Typography>
      </Box>

      {/* Participant count banner */}
      <Box
        sx={{
          p: 2,
          bgcolor: "background.default",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: 600 }}
        >
          {members.length} Participant{members.length !== 1 ? "s" : ""}
        </Typography>
      </Box>

      {/* Members list */}
      <List sx={{ flex: 1, overflowY: "auto", p: 0 }}>
        {members.map((member) => (
          <ListItem
            key={member.userId}
            onClick={() => onStartConversation(member)}
            sx={{
              py: 1.5,
              px: 3,
              cursor: "pointer",
              borderBottom: "1px solid",
              borderColor: "divider",
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <ListItemAvatar>
              <Avatar
                sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}
              >
                {member.username[0]?.toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="body1" sx={{ fontWeight: 600 }} noWrap>
                  {member.username}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
