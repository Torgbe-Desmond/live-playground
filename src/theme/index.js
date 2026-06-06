import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3A7D44",
      light: "#6AAB72",
      dark: "#1F5C2A",
      contrastText: "#fff",
    },
    secondary: {
      main: "#D4830A",
      light: "#F0A83C",
    },
    background: {
      default: "#F5F7F2",
      paper: "#FFFFFF",
    },
    surface: {
      main: "#EAF0E5",
    },
    text: {
      primary: "#1A2E1C",
      secondary: "#4A6551",
    },
    divider: "rgba(58, 125, 68, 0.12)",
    success: { main: "#4ADE80" },
    error: { main: "#F87171" },
    warning: { main: "#FBBF24" },
  },
  typography: {
    fontFamily: "'Sora', 'DM Sans', sans-serif",
    h1: { fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontWeight: 600, letterSpacing: "-0.01em" },
    h4: { fontWeight: 600, letterSpacing: "-0.01em" },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { lineHeight: 1.7 },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: "0.01em" },
  },
  shape: { borderRadius: 2 },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');
        body { 
          background-color: #F5F7F2; 
          scrollbar-width: thin; 
          scrollbar-color: #3A7D44 #D6E4D8; 
        }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #D6E4D8; }
        ::-webkit-scrollbar-thumb { background: #3A7D44; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #2d6436; }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          padding: "9px 20px",
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #3A7D44 0%, #6AAB72 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #2d6436 0%, #58965f 100%)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(58, 125, 68, 0.08)",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "& fieldset": { borderColor: "rgba(58, 125, 68, 0.15)" },
            "&:hover fieldset": { borderColor: "rgba(58, 125, 68, 0.4)" },
            "&.Mui-focused fieldset": { borderColor: "#3A7D44" },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          background: "#FFFFFF",
          border: "1px solid rgba(58, 125, 68, 0.08)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 2 },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          "&.Mui-selected": {
            background:
              "linear-gradient(135deg, rgba(58,125,68,0.1), rgba(58,125,68,0.05))",
            borderLeft: "3px solid #3A7D44",
          },
        },
      },
    },
    MuiDialogPaper: {
      styleOverrides: {
        root: { background: "#FFFFFF" },
      },
    },
  },
});

export default theme;