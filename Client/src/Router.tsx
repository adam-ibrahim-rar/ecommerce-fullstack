import {
  createBrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";

import App from "./App";

// Pages
import Home from "./features/home/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./features/Cart/Cart";
import Wishlist from "./features/Wishlist/Wishlist";
import Products from "./features/Products/Products";
import Register from "./pages/Singing/Register";
import Login from "./pages/Singing/Login";
import NotFound from "./pages/NotFound";

// User
import Settings from "./features/auth/components/User/Settings";
import ProfileForm from "./features/auth/components/User/ProfileForm";
import AddressForm from "./features/auth/components/User/AddressForm";
import RemoveAccount from "./features/auth/components/RemoveAccount";

// Admin
import Admin from "./features/admin/Admin";
import AdminHome from "./features/admin/AdminHome";
import AdminLogin from "./features/admin/AdminLogin";
import AdminProducts from "./features/admin/products/Products";

// Helpers
import ProtectedRoutes from "./components/Helpers/ProtectedRoutes";

// Toast
import { Toaster } from "sonner";
import AdminCategories from "./features/admin/Categories/Categories";
import AdminUsers from "./features/admin/users/AdminUsers";
import AdminUserDetails from "./features/admin/users/AdminUserDetails";
import Order from "./features/order/Order";
import AdminOrders from "./features/admin/order/AdminOrder";
import AdminOrderDetails from "./features/order/Adminorderdetails";
import AdminBanners from "./features/admin/banners/Banners";

const Router = createBrowserRouter([
  // ============================
  // User
  // ============================
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "about",
        element: <About />,
      },

      {
        path: "contact",
        element: <Contact />,
      },

      {
        element: <ProtectedRoutes index="/account/login" />,
        children: [
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "wishlist",
            element: <Wishlist />,
          },
          {
            path: "checkout",
            element: <Order />,
          },
          {
            path: "settings",
            element: <Settings />,
            children: [
              {
                index: true,
                element: <Navigate to="my-account" replace />,
              },
              {
                path: "my-account",
                element: <ProfileForm />,
              },
              {
                path: "my-address",
                element: <AddressForm />,
              },
              {
                path: "remove-account",
                element: <RemoveAccount />,
              },
              {
                path: "*",
                element: (
                  <Navigate
                    to="/settings/my-account"
                    replace
                  />
                ),
              },
            ],
          }
        ],
      },

      {
        path: "products/:id",
        element: <Products />,
      },
      {
        path: "products",
        element: <Products />,
      },

      {
        path: "account/register",
        element: <Register />,
      },

      {
        path: "account/login",
        element: <Login />,
      },

     

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
 // ============================
  // admin
  // ============================

  {
    path: "/admin",
    element: (
      <>
        <Toaster
          position="top-right"
          closeButton
          toastOptions={{
            duration: 2000,
            classNames: {
              toast:
                "rounded-xl mt-8 shadow-lg !min-w-20 !w-fit text-center",
              title: "font-medium text-sm",
              description: "text-sm opacity-80",
              success:
                "!bg-emerald-100 !mt-16 !border-emerald-500 !text-emerald-700",
              error:
                "!bg-rose-700 !text-white",
            },
          }}
        />
        <Outlet />
      </>
    ),
    children: [
      // /admin --> /admin/login
      {
        index: true,
        element: <Navigate to="/admin/login" replace />,
      },

      // Login
      {
        path: "login",
        element: <AdminLogin />,
      },

      // Protected
      {
        element: <ProtectedRoutes index="/admin/login" />,
        children: [
          {
            path: "dashboard",
            element: <Admin />,
            children: [
              {
                index: true,
                element: <AdminHome />,
              },

              {
                path: "products",
                element: <AdminProducts />,
              },

              {
                path: "categories",
                element: <AdminCategories/>,
              },

              {
                path: "banners",
                element: <AdminBanners/>,
              },

              {
                path: "orders",
                element: <AdminOrders/>,
              },
              {
                path: "orders:id",
                element: <AdminOrderDetails/>,
              },

              {
                path: "users",
                element: <AdminUsers/>,
              },
              {
                path: "users/:id",
                element: <AdminUserDetails />,
              },
            ],
          },
        ],
      },

      {
        path: "*",
        element: <Navigate to="/admin/login" replace />,
      },
    ],
  },
]);

export default Router;