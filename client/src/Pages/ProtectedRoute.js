import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { loggedIn } = useAuth();
  if (loggedIn) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
}
export default ProtectedRoute;
