import { useState, useCallback } from 'react';

export const useHandlePartnerFormChange = () => {
  const [partnerFormData, setPartnerFormData] = useState<Record<string, any>>({});

  const handlePartnerChange = useCallback((name: string, value: any) => {
    setPartnerFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const resetPartnerForm = useCallback(() => {
    setPartnerFormData({});
  }, []);

  const setPartnerFormValues = useCallback((values: Record<string, any>) => {
    setPartnerFormData(values);
  }, []);

  return {
    partnerFormData,
    handlePartnerChange,
    resetPartnerForm,
    setPartnerFormValues,
  };
};