import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { toast } from "sonner";
import axios from "axios";

import Button from "../../../components/Helpers/Button";

import { createUserSchema, type CreateUserInput } from "../schemas/auth.schema";

import { useRegisterMutation, useGoogleAuthMutation } from "../api/authQueries";
import { useGoogleSignIn } from "../api/useGoogleSignIn";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const { mutateAsync, isPending } = useRegisterMutation();
  const { mutateAsync: googleMutateAsync, isPending: isGooglePending } =
    useGoogleAuthMutation();

  const onSubmit = async (data: CreateUserInput) => {
    toast.promise(mutateAsync(data), {
      loading: "Creating account...",

      success: () => {
        setTimeout(() => {
          navigate("/account/login");
        }, 500);

        return "Account created successfully!";
      },

      error: (error) => {
        if (axios.isAxiosError(error)) {
          return error.response?.data?.message ?? "Could not create account.";
        }

        return "Something went wrong.";
      },
    });
  };

  const handleGoogleCredential = (credential: string) => {
    toast.promise(googleMutateAsync({ credential }), {
      loading: "Signing up with Google...",

      success: () => {
        setTimeout(() => {
          navigate("/");
        }, 500);

        return "Signed up with Google successfully!";
      },

      error: (error) => {
        if (axios.isAxiosError(error)) {
          return error.response?.data?.message ?? "Could not sign up with Google.";
        }

        return "Something went wrong.";
      },
    });
  };

  const { promptGoogleSignIn, isReady: isGoogleReady } = useGoogleSignIn(
    handleGoogleCredential
  );

  return (
    <div className="w-[371px] h-[530px] flex flex-col gap-12 my-auto">
      <div className="gap-7 flex flex-col">
        <h1 className="h-[30px] capitalize font-normal text-3xl">
          Create an account
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
              placeholder="username"
              {...register("username")}
              className="
                focus:outline-none
                border-b
                placeholder:capitalize
                placeholder:text-gray-600
                w-full
              "
            />

            {errors.username && (
              <p className="text-brand text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

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
                right-0
                bottom-2
                cursor-pointer
              "
            >
              {showPassword ? (
                <IoEyeOffOutline size={20} />
              ) : (
                <IoEyeOutline size={20} />
              )}
            </button>

            {errors.password && (
              <p className="text-brand text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-4">
            <Button
              content={isPending ? "Creating..." : "Create Account"}
              classes="w-full"
              type="submit"
              disabled={isPending}
            />

            <div className="flex flex-col gap-8">
              <Button
                icon={<FcGoogle size={24} />}
                content={isGooglePending ? "Signing up..." : "Sign up with Google"}
                text="text-black"
                bg="bgtransparent"
                classes="w-full border"
                type="button"
                disabled={!isGoogleReady || isGooglePending}
                handleClick={() => promptGoogleSignIn()}
              />

              <div className="flex gap-3 self-center">
                <span className="text-[16px] capitalize text-gray-600">
                  Already have account?
                </span>

                <Link
                  to="/account/login"
                  className="
                    text-[16px]
                    font-medium
                    underline
                    underline-offset-6
                    text-gray-600
                    text-brand-hover
                  "
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}