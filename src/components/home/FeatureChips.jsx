import { Box, Paper, Typography, Chip } from "@mui/material";

const FEATURES = [
  "Real-time messaging",
  "File sharing",
  "Image previews",
  "Reply to messages",
  "Room history",
  "Auto cleanup",
  "Direct messages",
];

export default function FeatureChips() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "12px",
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "surface.main",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontWeight: "bold", mb: 2, letterSpacing: "0.05em" }}
      >
        FEATURES
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {FEATURES.map((f) => (
          <Chip
            key={f}
            label={f}
            size="small"
            variant="outlined"
            sx={{
              color: "text.primary",
              borderColor: "divider",
              bgcolor: "background.default",
            }}
          />
        ))}
      </Box>
    </Paper>
  );
}
