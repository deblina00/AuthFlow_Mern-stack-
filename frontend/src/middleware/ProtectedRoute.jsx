import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ProtectedRoute = ({ requiredRole }) => {
  const { token, role } = useAuthStore();
  // console.log("ProtectedRoute check:", { token, role, requiredRole });

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
