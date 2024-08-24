import { Errors } from "../hooks/useForm";
import { DefaultInput, InputContainer } from "../styles/components";

interface IProps {
  error: string | null | undefined;
  id: string;
  hasLabel?: boolean;
  label?: string;
  labelId?: string;
  name: string;
  placeholder?: string;
  reduired?: boolean;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: IProps) => {
  return (
    <>
      {!!props.label ? (
        <InputContainer id={props.labelId} htmlFor={props.id}>
          {props.label}
          <DefaultInput
            id={props.id}
            name={props.name}
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            required={!!props.reduired}
            onChange={props.onChange}
          />
        </InputContainer>
      ) : (
        <DefaultInput
          id={props.id}
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          required={!!props.reduired}
          onChange={props.onChange}
        />
      )}
      {!!props.error && <p>{props.error}</p>}
    </>
  );
};
