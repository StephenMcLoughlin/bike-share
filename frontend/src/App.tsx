import styled from "styled-components";
import "./App.css";
import { SideBarContainer } from "./containers/SidebarContainer/SidebarContainer";
import { MainPanelContainer } from "./containers/MainPanelContainer/MainPanelContainer";
import { Row } from "./styles/components";

const AppContainer = styled(Row)`
  // height: 100vh;
`;

function App() {
  return (
    <AppContainer>
      <SideBarContainer />
      <MainPanelContainer />
    </AppContainer>
  );
}

export default App;
