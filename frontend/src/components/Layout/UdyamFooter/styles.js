import styled from 'styled-components';
import { udyamColors } from '../../../theme/udyamColors';

export const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #1B2951 0%, #2C3E50 100%);
  color: ${udyamColors.text.white};
  padding: 40px 0 20px 0;
  margin-top: 50px;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

export const FooterSection = styled.div`
  h3 {
    color: ${udyamColors.text.white};
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
    border-bottom: 2px solid ${udyamColors.primary.blue};
    padding-bottom: 8px;
  }
`;

export const ContactInfo = styled.div`
  h4 {
    color: ${udyamColors.text.white};
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px;
  }
  
  p {
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 1.5;
  }
  
  a {
    color: #AED6F1;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ServiceLinks = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  
  li {
    margin-bottom: 10px;
    
    a {
      color: ${udyamColors.text.white};
      text-decoration: none;
      font-size: 14px;
      transition: color 0.3s ease;
      
      &:hover {
        color: #AED6F1;
        text-decoration: underline;
      }
      
      &::before {
        content: "▶";
        margin-right: 8px;
        font-size: 10px;
        color: ${udyamColors.primary.lightBlue};
      }
    }
  }
`;

export const VideoSection = styled.div`
  text-align: center;
  
  h3 {
    margin-bottom: 20px;
  }
`;

export const VideoPlaceholder = styled.div`
  background: linear-gradient(45deg, #2E86C1, #3498DB);
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  border: 2px solid #AED6F1;
  
  h4 {
    margin: 0 0 10px 0;
    font-size: 18px;
    color: ${udyamColors.text.white};
  }
  
  p {
    margin: 0;
    font-size: 14px;
    color: #AED6F1;
  }
  
  .play-icon {
    font-size: 30px;
    margin-bottom: 15px;
    color: ${udyamColors.text.white};
  }
`;

export const BottomBar = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 20px;
  text-align: center;
`;

export const CopyrightText = styled.p`
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #AED6F1;
`;

export const BottomLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`;

export const BottomLink = styled.a`
  color: ${udyamColors.text.white};
  text-decoration: none;
  font-size: 13px;
  
  &:hover {
    color: #AED6F1;
    text-decoration: underline;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;
`;

export const SocialIcon = styled.a`
  width: 35px;
  height: 35px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${udyamColors.text.white};
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: ${udyamColors.primary.blue};
  }
`;

