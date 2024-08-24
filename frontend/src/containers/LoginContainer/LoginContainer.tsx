import styled from "styled-components";
import { LoginForm } from "../../components/LoginForm";
import useForm, { Errors, FormState } from "../../hooks/useForm";
import { Column } from "../../styles/components";

interface IProps {}

const Container = styled(Column)`
  justify-content: center;
  align-items: center;
`;

export const LoginContainer = ({}: IProps) => {
  const validate = (values: FormState) => {
    const errors: Errors = {
      test: null,
      email: null,
      password: null,
    };
    if (!values.test) errors.test = "test is required";
    if (!values.email) errors.email = "Email is required";
    if (!values.password) errors.password = "Password is required";
    return errors;
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: "", password: "", test: "" },
    validate
  );

  const onSubmit = () => {
    console.log("submit");
  };

  return (
    <Container>
      <LoginForm
        onSubmit={handleSubmit(onSubmit)}
        onChange={handleChange}
        errors={errors}
        values={values}
      />
    </Container>
  );
};
