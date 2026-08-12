import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

export default function UpNavBar() {

  return (
    <div className="bg-black h-12 text-white flex items-center px-20">
      <div className="w-[1170px] mx-auto flex items-center pl-84 justify-between ">
        <div className=" text-center text-sm">
          Summer Sale For All Swim Suits And Free Express Delivery -
          <Link
            to="/shop"
            className="font-semibold underline ml-1"
          >
            Shop Now
          </Link>
        </div>
      </div>
        <Dropdown/>
    </div>
  );
}