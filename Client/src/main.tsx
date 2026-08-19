import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App.tsx";

import Home from "./pages/Home/Home.tsx";
import About from "./pages/About.tsx";
import NotFound from "./pages/NotFound.tsx";
import Contact from "./pages/Contact.tsx";
import Register from "./pages/Singing/Register.tsx";
import Login from "./pages/Singing/Login.tsx";
import Products from "./pages/Products/Products.tsx";
import ProfileForm from "./pages/User/ProfileForm.tsx";
import AddressForm from "./pages/User/AddressForm.tsx";
import Settings from "./pages/User/Settings.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import Checkout from "./pages/CheckOut/CheckOut.tsx";
import { Provider } from "react-redux";
import { store } from "./reduxtoolkit/store.ts";
import RemoveAccount from "./features/auth/components/RemoveAccount.tsx";
import AdminLogin from "./features/admin/pages/AdminLogin.tsx";
import AdminHome from "./features/admin/pages/AdminHome.tsx";
import Admin from "./features/admin/pages/Admin.tsx";
const queryClient = new QueryClient();

const router = createBrowserRouter([
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
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "products/:id",
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
            element: <Navigate to="/Settings/my-account" replace />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "admin",
    children: [
      {
        path: "login",
        element: <AdminLogin />,
      },
      {
        element: <Admin />,
        children: [
          {
            index: true,
            element: <AdminHome />,
          },

          {
            path: "products",
            element: <div>Products</div>,
          },

          {
            path: "categories",
            element: <div>Categories</div>,
          },

          {
            path: "orders",
            element: <div>Orders</div>,
          },

          {
            path: "users",
            element: <div>Users</div>,
          },
        ],
      },
      {path:"*",
        element:<Navigate to={"/"}/>
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      
    </QueryClientProvider>
    </Provider>
  </StrictMode>,
);