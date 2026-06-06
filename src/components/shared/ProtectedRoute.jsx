import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const { userId } = useSelector((s) => s.user);
  if (!userId) return <Navigate to="/" replace />;
  return children;
}
