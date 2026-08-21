import { FaRegHeart } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import { FiUser } from "react-icons/fi";
import { NavLink, Link, useLocation } from "react-router-dom";
import Search from "./Search";
import { useState } from "react";
import AccountDropdown from "./AccountDropdown";

import { useAppSelector } from "../../reduxtoolkit/hooks";

export default function NavBar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const number = 1;

  return (
    <>
      <div className="w-[1170px] mx-auto mt-2 h-10 flex items-center justify-between">
        <Link to="/">
          <h1 className="text-2xl font-bold">Exclusive</h1>
        </Link>

        <ul
          className={`flex items-center justify-end  w-100  ${
            isAuthenticated ? " gap-24" : "gap-13"
          }`}
        >
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

          {!isAuthenticated && (
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
          )}
        </ul>

        <div className="flex items-center gap-6">
          <Search />

          {location.pathname === "/account/register" ||
          location.pathname === "/account/login" ? null : (
            <div className="flex items-center gap-4">
              {/* WISHLIST */}
              <Link className="relative" to="/wishlist">
                <FaRegHeart className="size-6 cursor-pointer" />

                {number > 0 && (
                  <span
                    className="
                      bg-secondary-two
                      absolute
                      bottom-3.5
                      left-4
                      w-[18px]
                      h-[18px]
                      rounded-full
                      flex
                      justify-center
                      items-center
                      text-white
                      text-[12px]
                    "
                  >
                    {number}
                  </span>
                )}
              </Link>

              {/* CART */}
              <Link className="relative" to="/cart">
                <GrCart className="size-6 cursor-pointer" />

                {number > 0 && (
                  <span
                    className="
                      bg-secondary-two
                      absolute
                      bottom-3.5
                      left-4
                      w-[18px]
                      h-[18px]
                      rounded-full
                      flex
                      justify-center
                      items-center
                      text-white
                      text-[12px]
                    "
                  >
                    {number}
                  </span>
                )}
              </Link>

              {isAuthenticated && (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen((prev) => !prev);
                    }}
                    className={`
                      w-[40px]
                      h-[40px]
                      rounded-full
                      flex
                      items-center
                      justify-center
                      cursor-pointer
                      ${
                        location.pathname === "/settings/my-account"
                          ? "bg-secondary-two text-white"
                          : "text-black"
                      }
                    `}
                  >
                    <FiUser
                      size={
                        location.pathname === "/settings/my-account" ? 22 : 38
                      }
                    />
                  </button>

                  {open && <AccountDropdown setOpen={setOpen} />}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <hr className="mt-2 h-[1px] bg-gray-300 border-none opacity-40" />
    </>
  );
}
