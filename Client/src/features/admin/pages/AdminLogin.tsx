import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import iphone from "../../../assets/iphone.jpg";
import axios from "axios";
import { toast } from "sonner";

import Button from "../../../components/Helpers/Button";

import {
  loginUserSchema,
  type LoginUserInput,
} from "../../auth/schemas/auth.schema";

import { useLoginMutation } from "../../auth/api/authQueries";

import { useAppDispatch } from "../../../reduxtoolkit/hooks";

import { setUser } from "../../../reduxtoolkit/slices/auth/authSlice";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutateAsync, isPending } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });
const onSubmit = async (data: LoginUserInput) => {
  toast.promise(
    mutateAsync(data).then((response) => {
      const user = response.data;

      if (user.role !== "admin") {
        throw new Error("You don't have admin access.");
      }
      dispatch(setUser(user));
      navigate("/admin/dashboard");
      return user;
    }),
    {
      loading: "Logging in...",
      success: "Login successful. Welcome Admin!",
      error: (error) => {
        if (axios.isAxiosError(error)) {
          return error.response?.data?.message ?? "Login failed.";
        }

        return error instanceof Error
          ? error.message
          : "Something went wrong.";
      },
    }
  );
};

  return (
    <div className="relative min-h-dvh ">
      {/* Background */}
      <img
        src={iphone}
        alt="Admin login background"
        className="
      absolute
      inset-0
      w-full
      h-full
      object-cover
    "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Floating Login Card */}
      <div className="relative z-10 min-h-dvh flex items-center justify-center px-4">
        <div
          className="
        w-full
        max-w-[450px]
        bg-white
        rounded-2xl
        shadow-2xl
        px-10
        py-12
      "
        >
          <div className="flex flex-col gap-7">
            <h1 className="font-normal text-4xl">Admin Login</h1>

            <p className="text-[16px]">Enter your admin credentials</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-10 mt-10"
          >
            <div className="flex flex-col gap-6">
              {/* Email */}
              <div>
                <input
                  type="text"
                  placeholder="email"
                  {...register("email")}
                  className="
                focus:outline-none
                px-2
                rounded-xl
                border-b
                placeholder:capitalize
                placeholder:text-gray-600
                w-full
                bg-transparent
                py-2
              "
                />

                {errors.email && (
                  <p className="text-secondary-two text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  {...register("password")}
                  className="
                focus:outline-none
                px-2
                rounded-xl
                border-b
                placeholder:capitalize
                placeholder:text-gray-600
                w-full
                pr-10
                bg-transparent
                py-2
              "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="
                absolute
                right-2
                bottom-2.5
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
                  <p className="text-secondary-two text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                content={isPending ? "Logging in..." : "Login"}
                classes="w-full !py-3"
                type="submit"
                disabled={isPending}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
