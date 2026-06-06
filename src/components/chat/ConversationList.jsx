import { useMemo, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Badge,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { useDispatch, useSelector } from "react-redux";
import RoomInfoDrawer from "../room/RoomInfoDrawer";
import { generateConversationId } from "../../utils/helpers";
import {
  markAsRead,
  setActiveConversation,
} from "../../features/personal/personalSlice";

export default function ConversationList({
  conversations,
  activeConversationId,
  currentUserId,
  hidden,
  onSelectConversation,
  onStartNewConversation,
}) {
  const { unreadCounts } = useSelector((s) => s.personal);
  const { peopleConnected } = useSelector((s) => s.room);
  const { userId } = useSelector((s) => s.user);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const dispatch = useDispatch();

  const otherMembers = useMemo(() => {
    if (!Array.isArray(peopleConnected)) return [];
    return peopleConnected.filter((p) => p.userId !== userId);
  }, [peopleConnected, userId]);

  const handleStartConversation = (member) => {
    const convId = generateConversationId(userId, member.userId);
    dispatch(
      setActiveConversation({
        conversationId: convId,
        recipient: { userId: member.userId, username: member.username },
      }),
    );
  };

  return (
    <Box
      sx={{
        width: { xs: hidden ? 0 : "100%", md: 360 },
        flexShrink: 0,
        borderRight: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "width 0.2s",
        bgcolor: "background.paper",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          bgcolor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Chats
        </Typography>
        <IconButton onClick={() => setDrawerOpen(true)} color={"default"}>
          <AddCommentIcon />
        </IconButton>
      </Box>

      {/* List */}
      <List sx={{ flex: 1, overflowY: "auto", p: 0 }}>
        {conversations.length === 0 ? (
          <Box sx={{ p: 4, textAlign: "center", opacity: 0.4 }}>
            <ChatBubbleOutlineIcon
              sx={{ fontSize: 40, mb: 1, color: "text.secondary" }}
            />
            <Typography variant="body2" color="text.secondary">
              No conversations yet
            </Typography>
          </Box>
        ) : (
          conversations.map((conv) => {
            const last = conv.lastMessage;
            const isActive = activeConversationId === conv.id;

            const otherUserId =
              last?.from === currentUserId ? last?.to : last?.from;
            const otherName =
              last?.senderId !== currentUserId ? last?.username : "You";
            const numberUnread = unreadCounts[conv.id];

            return (
              <Box
                key={conv.id}
                sx={{ borderBottom: "1px solid", borderColor: "divider" }}
              >
                <ListItemButton
                  selected={isActive}
                  onClick={() => {
                    onSelectConversation(
                      conv.id,
                      otherUserId || conv.id,
                      otherName || conv.id,
                    );
                    dispatch(markAsRead(conv.id));
                  }}
                  sx={{
                    py: 1.5,
                    px: 2,
                    "&.Mui-selected": { bgcolor: "action.selected" },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                      }}
                    >
                      {(otherName?.[0] || "?").toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 600 }}
                          noWrap
                        >
                          {otherName}
                        </Typography>

                        {/* Unread Badge */}
                        {numberUnread > 0 && (
                          <Badge
                            badgeContent={numberUnread}
                            color="error"
                            sx={{
                              "& .MuiBadge-badge": {
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                minWidth: 20,
                                height: 20,
                              },
                            }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        sx={{ mt: 0.5 }}
                      >
                        {last?.content ||
                          (last?.file ? "📎 File Attachment" : "")}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </Box>
            );
          })
        )}
      </List>

      <RoomInfoDrawer
        open={drawerOpen}
        members={otherMembers}
        onClose={() => setDrawerOpen(false)}
        onStartConversation={handleStartConversation}
      />
    </Box>
  );
}
