import React from 'react';
import styled from 'styled-components';
import { theme } from '../../theme';

const ContainerWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${theme.colors.background.grey} 0%, ${theme.colors.background.secondary} 100%);
`;

const MainContent = styled.main`
  max-width: ${theme.spacing.container.xl};
  margin: 0 auto;
  padding: ${theme.spacing.lg} ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.md} ${theme.spacing.sm};
  }
`;

const Footer = styled.footer`
  background: ${theme.colors.text.primary};
  color: ${theme.colors.text.white};
  padding: ${theme.spacing.lg} 0;
  margin-top: ${theme.spacing['4xl']};
`;

const FooterContent = styled.div`
  max-width: ${theme.spacing.container.xl};
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  text-align: center;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.white};
  opacity: 0.8;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }
`;

const FooterLink = styled.a`
  color: ${theme.colors.text.white};
  text-decoration: none;
  font-size: ${theme.typography.fontSize.sm};
  opacity: 0.8;
  transition: ${theme.transitions.default};
  
  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;

const Container = ({ children }) => {
  return (
    <ContainerWrapper>
      <MainContent>
        {children}
      </MainContent>
      
      <Footer>
        <FooterContent>
          <FooterText>
            © 2024 Government of India | Ministry of Micro, Small and Medium Enterprises
          </FooterText>
          <FooterText>
            उद्यम पंजीकरण पोर्टल | Udyam Registration Portal
          </FooterText>
          
          <FooterLinks>
            <FooterLink href="#" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </FooterLink>
            <FooterLink href="#" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </FooterLink>
            <FooterLink href="#" target="_blank" rel="noopener noreferrer">
              Help & Support
            </FooterLink>
            <FooterLink href="#" target="_blank" rel="noopener noreferrer">
              Contact Us
            </FooterLink>
          </FooterLinks>
        </FooterContent>
      </Footer>
    </ContainerWrapper>
  );
};

export default Container;
