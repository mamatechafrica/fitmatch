import { useState, useCallback } from 'react';

export const useHandleFormChange = () => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = useCallback((name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({});
  }, []);

  const setFormValues = useCallback((values: Record<string, any>) => {
    setFormData(values);
  }, []);

  return {
    formData,
    handleChange,
    resetForm,
    setFormValues,
  };
};