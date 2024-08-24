import styled from "styled-components";
import { DefaultButton } from "../styles/components";
import { COLOR } from "../styles/colors";
import { baseUnit } from "../styles/variables";

const MenuItemButton = styled(DefaultButton)`
  border: 1px solid ${COLOR.BLACK};
  border-radius: 5px;
  padding: ${baseUnit()};
`;

interface IProps {
  icon?: JSX.Element;
  title: string;
  onClick?: () => void;
}

export const MenuItem = ({ icon, title, onClick }: IProps) => {
  return (
    <MenuItemButton onClick={onClick} disabled={true}>
      {icon ? icon : null}
      {title}
    </MenuItemButton>
  );
};
