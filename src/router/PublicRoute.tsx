import { Navigate, Outlet } from "react-router-dom";

import useAuthStore from "@/stores/auth.store";

const PublicRoute = () => {
  const token = useAuthStore((state) => state.token);

  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
