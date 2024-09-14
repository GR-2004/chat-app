import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return user ? element : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
