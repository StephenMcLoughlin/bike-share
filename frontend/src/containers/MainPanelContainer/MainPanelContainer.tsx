import styled from "styled-components";
import { Column } from "../../styles/components";
import { LoginContainer } from "../LoginContainer/LoginContainer";
import { baseUnit } from "../../styles/variables";

const Container = styled(Column)`
  flex: 1;
  border: 1px solid #000;
  height: 100vh;
  justify-content: center;
`;

export const MainPanelContainer = () => {
  return (
    <Container>
      <LoginContainer />
    </Container>
  );
};
