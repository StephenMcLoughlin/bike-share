import styled from "styled-components";
import { Column } from "../../styles/components";
import { MenuItem } from "../../components/MenuItem";
import { baseUnit } from "../../styles/variables";

const Container = styled(Column)`
  width: 20%;
  padding: ${baseUnit()};
  // justify-content: space-between;
`;

export const SideBarContainer = () => {
  const options = [
    { title: "something" },
    { title: "something else" },
    { title: "another thing" },
  ];
  return (
    <Container>
      <div>Bike Share</div>
      {options.map((option) => (
        <MenuItem key={option.title} title={option.title} />
      ))}
    </Container>
  );
};
