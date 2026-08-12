import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

export default function News() {
  return (
    <div className="bg-black h-12 text-white">
      <div className="w-[1170px] h-full mx-auto flex items-center justify-between">
        
        <div className="w-24"></div>

        <div className="text-sm text-center flex-1">
          Summer Sale For All Swim Suits And Free Express Delivery -
          <Link
            to="/shop"
            className="font-semibold underline ml-1"
          >
            Shop Now
          </Link>
        </div>

        <Dropdown />
      </div>
    </div>
  );
}