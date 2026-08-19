import { Outlet } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

export default function Admin() {
  return (
    <div>
      <AdminSidebar />

      <div>
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
}