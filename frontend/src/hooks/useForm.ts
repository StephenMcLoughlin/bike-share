import { useState } from "react";

// TODO: Move to somewhere better
export interface FormState {
  [key: string]: any;
}

// TODO: Move to somewhere better
export interface Errors {
  [key: string]: string | null | undefined;
}

const useForm = (
  initialState: FormState,
  validate: (values: FormState) => Errors
) => {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit =
    (onSubmit: () => void) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const validationErrors = validate(values);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        onSubmit();
      }
    };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
