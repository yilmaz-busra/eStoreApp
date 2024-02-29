import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, panel }) {
  const { loggedIn, user } = useAuth();

  if (panel && user?.role === "admin") {
    return children;
  } else if (panel && user?.role !== "admin") {
    return <Navigate to={"/"} />;
  }

  if (loggedIn) {
    return children;
  }

  return <Navigate to={"/"} />;
}
export default ProtectedRoute;
