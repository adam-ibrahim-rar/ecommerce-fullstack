import { FaRegHeart } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import { NavLink, Link, useLocation } from "react-router-dom";
import Search from "./Search";

export default function NavBar() {
  const location = useLocation();
  return (
    <>
      <div className="w-[1170px] mx-auto mt-2 h-10 flex items-center justify-between">
        <div className="flex items-center gap-40">
          <Link to="/">
            <h1 className="text-2xl font-bold">Exclusive</h1>
          </Link>

          <ul className="flex items-center gap-12">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `pb-1 ${isActive ? "border-b-2 border-black" : ""}`
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `pb-1 ${isActive ? "border-b-2 border-black" : ""}`
                }
              >
                Contact
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `pb-1 ${isActive ? "border-b-2 border-black" : ""}`
                }
              >
                About
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/account/register"
                className={({ isActive }) =>
                  `pb-1 ${isActive ? "border-b-2 border-black" : ""}`
                }
              >
                Sign Up
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-6">
          <Search />

          {location.pathname == "/account/register" ||
          location.pathname == "/account/login" ? null : (
            <div className="flex items-center gap-4">
              <Link to="/wishlist">
                <FaRegHeart className="size-6 cursor-pointer" />
              </Link>

              <Link to="/cart">
                <GrCart className="size-6 cursor-pointer" />
              </Link>
            </div>
          )}
        </div>
      </div>

      <hr className="mt-2 h-[1px] bg-gray-300 border-none opacity-40" />
    </>
  );
}
