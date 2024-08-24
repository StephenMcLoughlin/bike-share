import styled from "styled-components";
import { COLOR } from "./colors";
import { baseUnit } from "./variables";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Text = styled.p`
  padding: 0px;
  margin: 0px;
  color: ${COLOR.TEXT.DEFAULT};
`;

export const DefaultButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: ${COLOR.BUTTON.DEFAULT_BACKGROUND};
  color: ${COLOR.BUTTON.DEFAULT_TEXT};

  &:hover {
    background: red;
  }

  &:active {
    background: green;
  }

  &:disabled {
    color: ${COLOR.BUTTON.DISABLED_TEXT}
    background-color: ${COLOR.BUTTON.DISABLED_BACKGROUND};
  }
`;

export const DefaultInput = styled.input`
  padding: ${baseUnit()};
`;

export const DefaultLabel = styled.label`
  color: ${COLOR.TEXT.DEFAULT};
`;

export const InputContainer = styled(DefaultLabel)`
  width: 100%;
  display: flex;
  flex-direction: column;
  // gap: ${baseUnit(0.25)};
`;
