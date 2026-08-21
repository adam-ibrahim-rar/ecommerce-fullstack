import { useAppSelector } from "@/reduxtoolkit/hooks";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes({index}:{index:string}) {
  
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={index} />;
  }
  return <Outlet />;
}
