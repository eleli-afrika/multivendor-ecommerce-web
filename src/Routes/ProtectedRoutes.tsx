import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const user = useSelector((state: any) => state.auth.user);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
