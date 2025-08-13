import styled from 'styled-components';
import { udyamColors } from '../../../theme/udyamColors';

export const HeaderContainer = styled.header`
  background: rgba(24, 6, 185, 0.8);
  color: ${udyamColors.text.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
`;

export const NavigationBar = styled.nav`
  padding: 0;
`;

export const NavContent = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 10px;
  display: flex;
`;

export const NavMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  margin-left: 200px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const NavItem = styled.li`
  position: relative;
  border-bottom: none;
`;

export const NavLink = styled.a`
  display: block;
  padding: 15px 20px;
  color: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'};
  text-decoration-color: #ffffff;
  font-size: 15px;
  font-family: "Open Sans", sans-serif;
  transition: 0.3s;
 
  &:hover {
    color: #ffffff;
    text-decoration: underline;
    text-decoration-thickness: 3px;
    text-underline-offset: 10px;
  }
  
  @media (max-width: 768px) {
    padding: 12px 20px;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: ${udyamColors.text.white};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 1000;
  display: none;
  
  ${NavItem}:hover & {
    display: block;
  }
`;

export const DropdownItem = styled.a`
  display: block;
  padding: 12px 20px;
  color: ${udyamColors.text.primary};
  text-decoration: none;
  font-size: 14px;
  
  &:hover {
    background: ${udyamColors.background.section};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

export const DropdownArrow = styled.span`
  margin-left: 5px;
  font-size: 9px;
`;

export const TitleSection = styled.div`
  min-height: 40px;
  padding: 15px 0px;
  background: rgb(242, 246, 249);
`;

export const TitleContent = styled.div`
  font-size: 22px;
  color: rgb(36, 27, 99);
  font-weight: 500;
  font-family: "Open Sans", sans-serif;
  text-align: center;
`;

export const MobileMenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${udyamColors.text.white};
  font-size: 18px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

