import { useEffect, useState } from "react";
import FormSkeleton from "../../../../components/Skeletons/FormSkeleton";
import { useAppDispatch, useAppSelector } from "@/reduxtoolkit/hooks";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateUserSchema,
  type UpdateUserInput,
} from "../../schemas/auth.schema";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";

import { useUpdateMutation } from "../../api/authQueries";
import { setUser } from "@/reduxtoolkit/slices/auth/authSlice";

export default function ProfileForm() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const { firstName, lastName, email } = useAppSelector(
    (state) => state.auth.user!
  );

  const { mutateAsync, isPending } = useUpdateMutation();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),

    defaultValues: {
      firstName: firstName ?? "",
      lastName: lastName ?? "",
      email: email ?? "",

      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    reset({
      firstName: firstName ?? "",
      lastName: lastName ?? "",
      email: email ?? "",

      password: "",
      newPassword: "",
      confirmPassword: "",
    });
  }, [firstName, lastName, email, reset]);

  const onSubmit = async (data: UpdateUserInput) => {
    toast.promise(mutateAsync(data), {
      loading: "Updating profile...",

      success: (response) => {
        dispatch(setUser(response.data));

        reset({
          firstName: response.data.firstName ?? "",
          lastName: response.data.lastName ?? "",
          email: response.data.email ?? "",

          password: "",
          newPassword: "",
          confirmPassword: "",
        });

        return "Profile updated successfully!";
      },

      error: (error) => {
        if (axios.isAxiosError(error)) {
          return error.response?.data?.message ?? "Update failed.";
        }

        return "Something went wrong.";
      },
    });
  };

  if (loading) {
    return <FormSkeleton />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-[20px] font-medium text-secondary-two mb-[18px]">
        Edit Your Profile
      </h1><div className="flex gap-[50px]">
  <div className="w-[330px]">
    <label className="block text-[16px] mb-[8px]">
      First Name
    </label>

    <input
            type="text"
             {...register("firstName")}
            placeholder={firstName||"you must set your frist name"}
            className={`
                w-[330px]
                h-[50px]
                bg-gray-100
                rounded
                px-[13px]
                text-[18px]
                outline-none
                
                ${firstName?"":"text-secondary-two-placeholder"}`}
          />

    {errors.firstName && (
      <p className="text-secondary-two text-sm mt-1">
        {errors.firstName.message}
      </p>
    )}
  </div>

  <div className="w-[330px]">
    <label className="block text-[16px] mb-[8px]">
      Last Name
    </label>

   <input
            type="text"
             {...register("lastName")}
            placeholder={lastName||"you must set your frist name"}
            className={`
                w-[330px]
                h-[50px]
                bg-gray-100
                rounded
                px-[13px]
                text-[18px]
                outline-none
                
                ${lastName?"":"text-secondary-two-placeholder"}`}
          />


    {errors.lastName && (
      <p className="text-secondary-two text-sm mt-1">
        {errors.lastName.message}
      </p>
    )}
  </div>
</div>

<div className="flex gap-[50px] mt-[22px]">
  <div className="w-[330px]">
    <label className="block text-[16px] mb-[8px]">
      Email
    </label>

    <input
      type="email"
      value={email}
      className="
        w-full
        h-[50px]
        bg-gray-100
        rounded
        px-[13px]
        text-[16px]
        outline-none
      "
    />
  </div>

  <div className="w-[330px]">
    <label className="block text-[16px] mb-[8px]">
      Address
    </label>

    <input
      type="text"
      value="3lbe mn goha"
      readOnly
      className="
        w-full
        h-[50px]
        bg-gray-100
        rounded
        px-[13px]
        text-[16px]
        outline-none
      "
    />
  </div>
</div>

<div className="mt-[22px] w-[710px]">
  <label className="block text-[16px] mb-[8px]">
    Password Changes
  </label>

  <div className="flex flex-col gap-[13px]">    {/* Current Password */}
    <div className="relative">
      <input
        type={showCurrentPassword ? "text" : "password"}
        placeholder="Show Current Password"
        {...register("password")}
        className="
          w-[710px]
          h-[50px]
          bg-gray-100
          rounded
          px-[13px]
          pr-12
          text-[16px]
          outline-none
          placeholder:text-gray-500
        "
      />

      <button
        type="button"
        onClick={() => setShowCurrentPassword((prev) => !prev)}
        className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          cursor-pointer
        "
      >
        {showCurrentPassword ? (
          <IoEyeOffOutline size={22} />
        ) : (
          <IoEyeOutline size={22} />
        )}
      </button>

      {errors.password && (
        <p className="text-secondary-two text-sm mt-1">
          {errors.password.message}
        </p>
      )}
    </div>

    {/* New Password */}
    <div>
      <input
        type= "text" 
        placeholder="New Password"
        {...register("newPassword")}
        className="
          w-[710px]
          h-[50px]
          bg-gray-100
          rounded
          px-[13px]
          pr-12
          text-[16px]
          outline-none
          placeholder:text-gray-500
        "
      />


      {errors.newPassword && (
        <p className="text-secondary-two text-sm mt-1">
          {errors.newPassword.message}
        </p>
      )}
    </div>

    {/* Confirm Password */}
    <div >
      <input
        type="text" 
        placeholder="Confirm New Password"
        {...register("confirmPassword")}
        className="
          w-[710px]
          h-[50px]
          bg-gray-100
          rounded
          px-[13px]
          pr-12
          text-[16px]
          outline-none
          placeholder:text-gray-500
        "
      />

    

      {errors.confirmPassword && (
        <p className="text-secondary-two text-sm mt-1">
          {errors.confirmPassword.message}
        </p>
      )}
    </div>
  </div>
</div>

<div className="w-[710px] flex justify-end items-center gap-[32px] mt-[20px]">
  <button
    type="button"
    onClick={() =>
      reset({
        firstName: firstName ?? "",
        lastName: lastName ?? "",
        email: email ?? "",
        password: "",
        newPassword: "",
        confirmPassword: "",
      })
    }
    className="text-[16px] cursor-pointer"
  >
    Cancel
  </button>

  <button
    type="submit"
    disabled={isPending}
    className="
      w-[178px]
      h-[48px]
      bg-secondary-two
      text-white
      rounded
      text-[16px]
      cursor-pointer
      disabled:opacity-50
      disabled:cursor-not-allowed
    "
  >
    {isPending ? "Saving..." : "Save Changes"}
  </button>
</div>
</form>)}