import { Box, Typography } from "@mui/material";

export default function WelcomeBanner({ username }) {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
        Welcome back,{" "}
        <Box
          component="span"
          sx={{
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {username}
        </Box>{" "}
        👋
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Share files and chat in real-time — no account needed.
      </Typography>
    </Box>
  );
}
