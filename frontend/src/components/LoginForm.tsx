import React from "react";
import { Errors, FormState } from "../hooks/useForm";
import { Column, DefaultInput, DefaultLabel } from "../styles/components";
import styled from "styled-components";
import { baseUnit } from "../styles/variables";
import { Input } from "../reusable/Input";
import { COLOR } from "../styles/colors";

interface IProps {
  values: FormState;
  errors: Errors | null | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FormContainer = styled(Column)`
  max-width: 800px;
  min-width: 600x;
  border: 1px solid ${COLOR.BLACK};
  padding: ${baseUnit(2)};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${baseUnit()};
`;

const InputContainer = styled(DefaultLabel)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${baseUnit(0.2)};
`;

export const LoginForm = ({ values, errors, onChange, onSubmit }: IProps) => {
  return (
    <FormContainer>
      <Form onSubmit={onSubmit}>
        <Input
          error={errors?.email}
          id={"email"}
          name={"email"}
          type={"email"}
          hasLabel={true}
          label="Email:"
          value={values.email}
          onChange={onChange}
        />
        <Input
          error={errors?.password}
          id={"password"}
          name={"password"}
          type={"password"}
          hasLabel={true}
          label="Password:"
          value={values.password}
          onChange={onChange}
        />
        <Input
          id={"test"}
          name={"test"}
          type={"text"}
          label={"Test:"}
          value={values.test}
          onChange={onChange}
          error={errors?.test}
        ></Input>
        <button type="submit">Submit</button>
      </Form>
    </FormContainer>
  );
};
