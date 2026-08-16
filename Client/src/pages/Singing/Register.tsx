import { Link } from "react-router-dom";
import iphone from "../../assets/iphone.jpg";
import Button from "../../components/Helpers/Button";
import { FcGoogle } from "react-icons/fc";
import RegisterSkeleton from "../../components/Skeletons/RegisterSkeleton";
import { useEffect, useState } from "react";

export default function Register() {
  const [loading, setlodaing] = useState(true);
  useEffect(() => {
    setTimeout(() => setlodaing(false), 500);
  }, []);
  return loading ? (
    <RegisterSkeleton />
  ) : (
    <div className="w-[1420px] h-[784px] flex gap-[129px] justify-between ">
      <img src={iphone} className="w-[905px] h-[784px] object-cover" />
      <div className="w-[371px] h-[530px] flex flex-col gap-12 my-auto">
        <div className="gap-7 flex flex-col">
          <h1 className=" h-[30px] capitalize font-normal text-4xl">
            Create an account
          </h1>
          <p className="h-6 w-[191px] text-[16px]">Enter your details below</p>
        </div>
        <form className="flex flex-col h-[404px] gap-10">
          <div className="flex flex-col gap-10">
            <input
              type="text"
              placeholder="name"
              className="focus:outline-none border-b-1 placeholder:capitalize placeholder:text-gray-600"
            />
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
            <div className="flex flex-col gap-4  ">
              <Button
                content="Create Account"
                classes="w-full "
                handleClick={() => {}}
              />
              <div className="flex flex-col gap-8">
                <Button
                  icon={<FcGoogle size={24} />}
                  content="Sign up with Google"
                  text="text-black"
                  bg="bgtransparent"
                  classes="w-full border "
                  handleClick={() => {}}
                />
                <div className="flex gap-3 self-center">
                  <span className="text-[16px] capitalize text-gray-600">
                    Already have account?
                  </span>
                  <Link
                    to={"/account/login"}
                    className="text-[16px]  font-medium underline underline-offset-6 text-gray-600"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
