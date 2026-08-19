import axios from "axios";
import Button from "../../../components/Helpers/Button";
import { useReomvingMutation } from "../api/authQueries";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  useAppDispatch,
} from "../../../reduxtoolkit/hooks";

import {
  logout,
} from "../../../reduxtoolkit/slices/auth/authSlice";
export default function RemoveAccount() {
    const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
      mutateAsync,
    } = useReomvingMutation();
    const onSubmit = async () => {
    toast.promise(mutateAsync(), {
      loading: "Looding...",

      success: () => {
        dispatch(logout());
        navigate("/");

        return "Account Has Been Removed";
      },

      error: (error) => {
        if (axios.isAxiosError(error)) {
          return (
            error.response?.data?.message ??
            "Login failed."
          );
        }

        return "Something went wrong.";
      },
    });
  };
  return (
    <form className="w-full max-w-[500px] mx-auto flex flex-col items-center">
      <h1 className="text-[22px] font-semibold text-secondary-two mb-2">
        RemoveAccount
      </h1>

      <p className="text-[15px] text-gray-500 text-center max-w-[380px]">
        Are you sure you want to logout from your account?
      </p>

      <div className="w-full flex justify-center items-center gap-4 mt-7">
        <Button
          content="Cancel"
          type="button"
          text="text-secondary-two"
          bg="bg-gray-100"
          classes="text-[15px] !py-2.5 !px-8 hover:bg-gray-200"
          handleClick={onSubmit}
        />

        <Button
          content="RemoveAccount"
          type="button"
          text="text-white"
          bg="bg-secondary-two"
          classes="text-[15px] !py-2.5 !px-8"
        />
      </div>
    </form>
  );
}