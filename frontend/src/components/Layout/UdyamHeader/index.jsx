import React, { useState } from 'react';
import {
  HeaderContainer,
  NavigationBar,
  NavContent,
  NavMenu,
  NavItem,
  NavLink,
  Dropdown,
  DropdownItem,
  DropdownArrow,
  TitleSection,
  TitleContent
} from './styles';

const UdyamHeader = () => {
  const [activeNav, setActiveNav] = useState('Home'); // Default active navigation

  const navigationItems = [
    { label: 'Home', href: '#' },
    { label: 'NIC Code', href: '#' },
    { 
      label: 'Useful Documents', 
      href: '#',
      dropdown: [
        { label: 'Guidelines', href: '#' },
        { label: 'Forms', href: '#' },
        { label: 'FAQs', href: '#' }
      ]
    },
    { 
      label: 'Print / Verify', 
      href: '#',
      dropdown: [
        { label: 'Print Certificate', href: '#' },
        { label: 'Verify Certificate', href: '#' }
      ]
    },
    { 
      label: 'Update Details', 
      href: '#',
      dropdown: [
        { label: 'Update Registration', href: '#' },
        { label: 'Cancel Registration', href: '#' }
      ]
    },
    { 
      label: 'Login', 
      href: '#',
      dropdown: [
        { label: 'Applicant Login', href: '#' },
        { label: 'Officer Login', href: '#' }
      ]
    }
  ];

  return (
    <>
      <HeaderContainer>
        <NavigationBar>
          <NavContent>
            <img src="/MINISTRY_NAME.webp" alt="logo" width="250px"/>
            <NavMenu>
              {navigationItems.map((item, index) => (
                <NavItem key={index}>
                  <NavLink 
                    href={item.href}
                    active={activeNav === item.label}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveNav(item.label);
                    }}
                  >
                    {item.label}
                    {item.dropdown && <DropdownArrow>▼</DropdownArrow>}
                  </NavLink>
                  
                  {item.dropdown && (
                    <Dropdown>
                      {item.dropdown.map((dropItem, dropIndex) => (
                        <DropdownItem key={dropIndex} href={dropItem.href}>
                          {dropItem.label}
                        </DropdownItem>
                      ))}
                    </Dropdown>
                  )}
                </NavItem>
              ))}
            </NavMenu>
          </NavContent>
        </NavigationBar>
      </HeaderContainer>
      
      <TitleSection>
        <TitleContent>
          UDYAM REGISTRATION FORM - For New Enterprise who are not Registered yet as MSME
        </TitleContent>
      </TitleSection>
    </>
  );
};

export default UdyamHeader;

