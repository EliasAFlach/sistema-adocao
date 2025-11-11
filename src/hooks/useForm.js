import { useCallback, useState } from "react";

export const useForm = (initialValues, { validate, onSubmit } = {}) => {
  const [values, setValues] = useState({ ...initialValues });
  const [errors, setErrors] = useState({});

  const handleChange = useCallback(({ target: { name, value } }) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e?.preventDefault();
    if (validate) {
      const errs = validate(values);
      setErrors(errs || {});
      if (errs && Object.keys(errs).length) return;
    }
    onSubmit && onSubmit(values);
  }, [values, validate, onSubmit]);

  const reset = useCallback((next = initialValues) => {
    setValues({ ...next });
    setErrors({});
  }, [initialValues]);

  return { values, errors, handleChange, handleSubmit, reset, setValues, setErrors };
};
