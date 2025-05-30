import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Loader } from "lucide-react";

const AdminRoute = () => {
  const { authUser, isCheckingAuth } = useAuthStore();
  const location = useLocation(); // Get the current location

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  if (!authUser || authUser.role !== "ADMIN") {
    // Redirect to login or home, preserving the current location
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default AdminRoute;
