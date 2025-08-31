import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateUserData } from "@/store/slices/userSlice";

export const useHandleFormChange = () => {
  const dispatch = useDispatch();

  const handleChange = useCallback(
    (field: string, value: any) => {
      dispatch(updateUserData({ [field]: value }));
    },
    [dispatch]
  );

  return handleChange;
};
