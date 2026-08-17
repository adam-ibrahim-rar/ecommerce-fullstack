import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
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
        path: "Settings",
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
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
