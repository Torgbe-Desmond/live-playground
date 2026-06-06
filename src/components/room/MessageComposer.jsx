import { Box } from "@mui/material";
import MessageInput from "../chat/MessageInput";

export default function MessageComposer({
  sending,
  replyTo,
  onSend,
  onCancelReply,
}) {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        p: 1.5,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <MessageInput
        onSend={onSend}
        sending={sending}
        replyTo={replyTo}
        onCancelReply={onCancelReply}
        placeholder="Type a message"
      />
    </Box>
  );
}
