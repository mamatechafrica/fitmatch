import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updatePartnerData } from "@/store/slices/partnerSlice";

export const useHandlePartnerFormChange = () => {
  const dispatch = useDispatch();

  const handleChange = useCallback(
    (field: string, value: any) => {
      dispatch(updatePartnerData({ [field]: value }));
    },
    [dispatch]
  );

  return handleChange;
};
