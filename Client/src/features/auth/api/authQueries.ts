import { useMutation } from "@tanstack/react-query";

import { registerUser, loginUser, removeUser, getCurrentUser, updateUser } from "./authApi";
import { redirect } from "react-router-dom";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
export const useGetCurrentUserMutation = () => {
  return useMutation({
    mutationFn: getCurrentUser,
     onError:()=>{
      redirect("account/login")
    },
  });
};
export const useUpdateMutation = () => {
  return useMutation({
    mutationFn: updateUser,
  });
};
export const useReomvingMutation = () => {
  return useMutation({
    mutationFn: removeUser,
  });
};
