
import { FaRegHeart } from "react-icons/fa";
import { GrCart } from "react-icons/gr";

import { Link } from "react-router-dom";
import Search from "./Search";

export default function NavBar() {
  
  return (
   <>
    <div className="w-[1170px] mx-auto flex  justify-between items-center h-10 gap-58 jucbtify-between">
      <span className="flex gap-50 w-[675px] ">
        <h1 className="text-2xl font-bold">Exclusive</h1>
        <ul className="flex w-[367px] gap-12 items-center justify-between">
          <li>
            <Link to="/" className="hover:underline">
            Home
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline">
            Contact
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline">
            About
            </Link>
          </li>
          <li>
            <Link to="/signup" className="hover:underline">
            Signup
            </Link>
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
