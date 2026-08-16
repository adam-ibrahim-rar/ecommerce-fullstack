import { Link } from "react-router-dom";
import iphone from "../../assets/iphone.jpg";
import Button from "../../components/Helpers/Button";
import { useEffect, useState } from "react";
import LoginSkeleton from "../../components/Skeletons/LoginSkeleton";

export default function Login() {
   const [loading,setlodaing]=useState(true)
        useEffect(() => {
          setTimeout(
            ()=>setlodaing(false),500
          )
        }, []);
    return loading ? (
    <LoginSkeleton />
  ) : (
    
    <div className="w-[1420px] h-[784px] flex gap-[129px] justify-between ">

      <img src={iphone} className="w-[905px] h-[784px] object-cover" />
      <div className="w-[371px] h-[530px] flex flex-col gap-12 my-auto">
        <div className="gap-7 flex flex-col">
          <h1 className=" h-[30px] capitalize font-normal text-4xl">
            Log in to Exclusive
          </h1>
          <p className="h-6 w-[191px] text-[16px]">Enter your details below</p>
        </div>
        <form className="flex flex-col h-[404px] gap-10">
          <div className="flex flex-col gap-10">
            <input
              type="email"
              placeholder="email"
              className="focus:outline-none border-b-1 placeholder:capitalize placeholder:text-gray-600"
            />
            <input
              type="password"
              placeholder="password"
              className="focus:outline-none border-b-1 placeholder:capitalize placeholder:text-gray-600"
            />
          </div>

          <div>
            <div className="flex items-center  justify-between  ">
              <Button
                content="Log In"
                classes="w-fit "
                handleClick={() => {}}
              />
              <Link
                to={"/resetpassword"}
                className="text-[18px]  font-medium underline underline-offset-6 text-secondary-two"
              >
                Forget Password?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
