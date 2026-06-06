import { Box, Paper, Typography } from "@mui/material";

export default function NavCard({
  icon,
  iconBg,
  title,
  description,
  hoverBorderColor,
  onClick,
}) {
  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: 3,
        borderRadius: "12px",
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "surface.main",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: hoverBorderColor,
          transform: "translateY(-2px)",
          boxShadow: (theme) =>
            theme.shadows[4] || "0 8px 24px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            bgcolor: iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  );
}
