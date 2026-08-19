import { useMutation } from "@tanstack/react-query";

import { registerUser, loginUser, removeUser } from "./authApi";

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
export const useReomvingMutation = () => {
  return useMutation({
    mutationFn: removeUser,
  });
};