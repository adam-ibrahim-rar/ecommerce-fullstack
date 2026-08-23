import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import axios from "axios";
import { toast } from "sonner";

import Button from "../../../components/Helpers/Button";

import { loginUserSchema, type LoginUserInput } from "../schemas/auth.schema";

import { useLoginMutation, useGoogleAuthMutation } from "../api/authQueries";
import { useGoogleSignIn } from "../hooks/Usegooglesignin";

import { useAppDispatch } from "../../../reduxtoolkit/hooks";

import { setUser } from "../../../reduxtoolkit/slices/auth/authSlice";
import { getCart } from "../../../reduxtoolkit/slices/cart/cartSlice";
import { getWishlist } from "../../../reduxtoolkit/slices/wishlist/wishlistSlice";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { mutateAsync, isPending } = useLoginMutation();
  const { mutateAsync: googleMutateAsync, isPending: isGooglePending } =
    useGoogleAuthMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit = async (data: LoginUserInput) => {
    toast.promise(mutateAsync(data), {
      loading: "Logging in...",

      success: (response) => {
        dispatch(setUser(response.data));

        dispatch(getCart());
        dispatch(getWishlist());

        navigate("/");

        return "Login successful!";
      },

      error: (error) => {
        if (axios.isAxiosError(error)) {
          return error.response?.data?.message ?? "Login failed.";
        }

        return "Something went wrong.";
      },
    });
  };

  const handleGoogleCredential = (credential: string) => {
    toast.promise(googleMutateAsync({ credential }), {
      loading: "Signing in with Google...",

      success: (response) => {
        dispatch(setUser(response.data));

        dispatch(getCart());
        dispatch(getWishlist());

        navigate("/");

        return "Signed in with Google successfully!";
      },

      error: (error) => {
        if (axios.isAxiosError(error)) {
          return error.response?.data?.message ?? "Could not sign in with Google.";
        }

        return "Something went wrong.";
      },
    });
  };

  const { promptGoogleSignIn, isReady: isGoogleReady } = useGoogleSignIn(
    handleGoogleCredential
  );

  return (
    <div className="w-[371px] h-[530px] flex flex-col gap-9 my-auto">
      <div className="gap-7  flex flex-col">
        <h1 className="h-[30px] capitalize font-normal text-3xl">
          Log in to Exclusive
        </h1>

        <p className="h-6 w-[191px] text-[16px]">Enter your details below</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-[404px] gap-10"
      >
        <div className="flex flex-col gap-6">
          <div>
            <input
              type="text"
              placeholder="email"
              {...register("email")}
              className="
                focus:outline-none
                border-b
                placeholder:capitalize
                placeholder:text-gray-600
                w-full
              "
            />

            {errors.email && (
              <p className="text-brand text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              {...register("password")}
              className="
                focus:outline-none
                border-b
                placeholder:capitalize
                placeholder:text-gray-600
                w-full
                pr-10
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="
                absolute
                right-1
                bottom-0.5
                cursor-pointer
              "
            >
              {showPassword ? (
                <IoEyeOffOutline size={24} />
              ) : (
                <IoEyeOutline size={24} />
              )}
            </button>

            {errors.password && (
              <p className="text-brand text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <Button
              content={isPending ? "Logging in..." : "Log In"}
              classes="w-fit !py-2"
              type="submit"
              disabled={isPending}
            />

            <Link
              to="/resetpassword"
              className="
            text-[18px]
            font-medium
            underline
            underline-offset-6
            text-brand
            "
            >
              Forget Password?
            </Link>
          </div>

          <Button
            icon={<FcGoogle size={24} />}
            content={isGooglePending ? "Signing in..." : "Sign in with Google"}
            text="text-black"
            bg="bgtransparent"
            classes="w-full border"
            type="button"
            disabled={!isGoogleReady || isGooglePending}
            handleClick={() => promptGoogleSignIn()}
          />

          <div className="flex gap-3 self-center ">
            <span
              className="text-[18px] capitalize
                 text-gray-600"
            >
              Create account?
            </span>

            <Link
              to="/account/register"
              className="
                    text-[18px]
                    font-medium
                    underline
                    underline-offset-6
                    text-gray-600
                    text-brand-hover
                  "
            >
              Create account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}