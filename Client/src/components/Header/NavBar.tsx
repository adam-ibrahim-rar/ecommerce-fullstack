import { FaRegHeart } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import { AiOutlineUser } from "react-icons/ai";
import { NavLink, Link, useLocation } from "react-router-dom";
import Search from "./Search";
import { useState } from "react";
import AccountDropdown from "./AccountDropdown";

export default function NavBar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const login = true;
  return (
    <>
      <div className="w-[1170px] mx-auto mt-2 h-10 flex items-center justify-between">
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

        <div className="flex items-center gap-6">
          <Search />

          {location.pathname == "/account/register" ||
          location.pathname == "/account/login" ? null : (
            <div className="flex items-center gap-4">
              <Link to="/wishlist">
                <FaRegHeart className="size-6 cursor-pointer" />
              </Link>

              {login ? (<Link className="relative" to="/cart">
                <GrCart className="size-6 cursor-pointer" />
                <span className="bg-secondary-two absolute bottom-4/6 left-5 w-[18px] h-[18px] rounded-full flex justify-center items-center text-white text-[12px]">
                  {1}
                </span>
              </Link>):(<Link to="/cart">
                <GrCart className="size-6 cursor-pointer" />
              </Link>)
              }
              {login && (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen((prev) => !prev)
                      setTimeout(()=>setOpen(false),2500)
                    }}
                    
                    className="
                      w-[40px]
                      h-[40px]
                      rounded-full
                      bg-secondary-two
                      text-white
                      flex
                      items-center
                      justify-center
                      cursor-pointer
                "
                  >
                    <AiOutlineUser size={22} />
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
