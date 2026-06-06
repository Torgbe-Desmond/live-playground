import { Box, Typography, Avatar, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ChatHeader({ recipient, onBack }) {
  const displayName = recipient.username || recipient.userId;

  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        display: "flex",
        alignItems: "center",
        gap: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      {/* Back arrow — mobile only */}
      <IconButton
        size="small"
        sx={{ display: { md: "none" } }}
        onClick={onBack}
      >
        <ArrowBackIcon />
      </IconButton>

      <Avatar
        sx={{
          width: 40,
          height: 40,
          bgcolor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        {displayName[0]?.toUpperCase() || "?"}
      </Avatar>

      <Box>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, lineHeight: 1.2 }}
        >
          {displayName}
        </Typography>
      </Box>
    </Box>
  );
}
