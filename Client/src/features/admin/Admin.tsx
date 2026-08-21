import { Outlet } from "react-router-dom";

import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

export default function Admin() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex">
        <AdminSidebar />

        <div className="flex min-h-screen flex-1 flex-col">
          <AdminHeader />

          <main className="flex-1 overflow-y-auto p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
