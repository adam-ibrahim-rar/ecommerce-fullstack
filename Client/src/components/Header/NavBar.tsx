
import { FaRegHeart } from "react-icons/fa";
import { GrCart } from "react-icons/gr";

import { NavLink,Link } from "react-router-dom";
import Search from "./Search";

export default function NavBar() {
  
  return (
   <>
    <div className="w-[1170px] mt-2 mx-auto flex  justify-between items-center h-10 gap-58 jucbtify-between">
      <span className="flex gap-50 w-[675px] ">
        
        <Link to="/">
     <h1 className="text-2xl font-bold">Exclusive</h1>
    </Link>
        <ul className="flex w-[367px] items-center justify-between">
  <li>
    <NavLink
      to="/"
      className={({ isActive }) =>
        `pb-1 transition-all duration-200 ${
          isActive
            ? "border-b-2 border-black"
            : ""
        }`
      }
    >
      Home
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/contact"
      className={({ isActive }) =>
        `pb-1 transition-all duration-200 ${
          isActive
            ? "border-b-2 border-black"
            : ""
        }`
      }
    >
      Contact
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/about"
      className={({ isActive }) =>
        `pb-1 transition-all duration-200 ${
          isActive
            ? "border-b-2 border-black"
            : ""
        }`
      }
    >
      About
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/signup"
      className={({ isActive }) =>
        `pb-1 transition-all duration-200 ${
          isActive
            ? "border-b-2 border-black"
            : ""
        }`
      }
    >
      Sign Up
    </NavLink>
  </li>
</ul>
      </span>
      <span className="w-[347px] flex justify-between items-center gap-6 h-9">
     <Search/>
      <span className="flex gap-4 items-center w-20 ">
       <Link to="/wishlist">
       <FaRegHeart className="size-6 cursor-pointer"/>
       </Link>
       <Link to="/cart">
       <GrCart className="size-6 cursor-pointer"/>
       </Link>
      </span>
      </span>
    </div>
      <hr className=" h-0.5 bg-gray-300 opacity-40 border-none  mt-2"/></>
  )
}
