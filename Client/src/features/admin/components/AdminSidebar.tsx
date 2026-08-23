import {
  FiGrid,
  FiPackage,
  FiFolder,
  FiImage,        
  FiShoppingBag,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAppDispatch } from "@/reduxtoolkit/hooks";
import { logout } from "@/reduxtoolkit/slices/auth/authSlice";


const links = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: FiGrid,
  },
  {
    title: "Products",
    path: "/admin/dashboard/products",
    icon: FiPackage,
  },
  {
    title: "Categories",
    path: "/admin/dashboard/categories",
    icon: FiFolder,
  },
  {
    title: "Banners",
    path: "/admin/dashboard/banners",
    icon: FiImage,
  },
  {
    title: "Orders",
    path: "/admin/dashboard/orders",
    icon: FiShoppingBag,
  },
  {
    title: "Users",
    path: "/admin/dashboard/users",
    icon: FiUsers,
  },
];
export default function AdminSidebar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());

    toast.success("Logged out successfully.");

    navigate("/admin/login", {
      replace: true,
    });
  };

  return (
    <aside
      className="
        sticky
        top-0
        h-screen
        w-[270px]
        border-r
        bg-background
        flex
        flex-col
      "
    >
      <div
        className="
          h-20
          border-b
          flex
          items-center
          px-8
        "
      >
        <h1
          className="
            text-2xl
            font-bold
            tracking-tight
          "
        >
          E-Commerce
        </h1>
      </div>

      <nav
        className="
          flex-1
          px-4
          py-6
          flex
          flex-col
          gap-2
        "
      >
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                transition-all
                duration-200

                ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-muted"
                }
              `
              }
            >
              <Icon size={20} />

              <span
                className="
                  text-[15px]
                  font-medium
                "
              >
                {item.title}
              </span>
            </NavLink>
          );
        })}
      </nav>

      <div
        className="
          border-t
          p-4
        "
      >
        <button
  onClick={handleLogout}
  className="
    w-full
    rounded-xl
    px-4
    py-3

    flex
    items-center
    gap-3

    hover:bg-destructive/10
    transition
    cursor-pointer
  "
>
  <FiLogOut size={20} />

  <span
    className="
      text-[15px]
      font-medium
    "
  >
    Logout
  </span>
</button>
      </div>
    </aside>
  );
}
