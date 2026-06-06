import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./app/store";
import theme from "./theme";
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import RoomPage from "./pages/RoomPage";
import MessagesPage from "./pages/MessagesPage";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import SocketProvider from "./components/shared/SocketProvider";

function AppRoutes() {
  return (
    <SocketProvider>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/room" element={<ProtectedRoute><RoomPage /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SocketProvider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}
