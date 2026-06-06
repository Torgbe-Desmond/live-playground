import { Box, Paper, Typography } from "@mui/material";

export default function StatCard({ icon, label, value, color = "primary" }) {
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
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            bgcolor: (theme) =>
              `rgba(${theme.palette[color].main.replace(/rgb\(|\)/g, "")}, 0.12)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: `${color}.main`,
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            {label}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "text.primary" }}
          >
            {value}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
