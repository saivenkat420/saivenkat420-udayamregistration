import React from 'react';
import {
  FooterContainer,
  FooterContent,
  FooterGrid,
  FooterSection,
  ContactInfo,
  ServiceLinks,
  VideoSection,
  VideoPlaceholder,
  BottomBar,
  CopyrightText,
  BottomLinks,
  BottomLink,
  SocialIcons,
  SocialIcon
} from './styles';

const UdyamFooter = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>UDYAM REGISTRATION</h3>
            <ContactInfo>
              <h4>Ministry of MSME</h4>
              <p>Udyog bhawan - New Delhi</p>
              <p><strong>Email:</strong> <a href="mailto:champions@gov.in">champions@gov.in</a></p>
              <br />
              <h4>Contact Us</h4>
              <p><strong>For Grievances / Problems</strong></p>
            </ContactInfo>
          </FooterSection>
          
          <FooterSection>
            <h3>Our Services</h3>
            <ServiceLinks>
              <li><a href="#">CHAMPIONS</a></li>
              <li><a href="#">MSME Samadhaan</a></li>
              <li><a href="#">MSME Sambandh</a></li>
              <li><a href="#">MSME Dashboard</a></li>
              <li><a href="#">Entrepreneurship Skill Development Programme (ESDP)</a></li>
            </ServiceLinks>
          </FooterSection>
          
          <FooterSection>
            <VideoSection>
              <h3>Video</h3>
              <VideoPlaceholder>
                <div className="play-icon">▶</div>
                <h4>Udyam Registration</h4>
                <p>www.udyamregistration.gov.in</p>
              </VideoPlaceholder>
            </VideoSection>
          </FooterSection>
        </FooterGrid>
        
        <BottomBar>
          <CopyrightText>
            © Copyright Udyam Registration. All Rights Reserved, Website Content Managed by Ministry of Micro Small and Medium Enterprises, GoI
          </CopyrightText>
          <CopyrightText>
            Website hosted & managed by National Informatics Centre, Ministry of Communications and IT, Government of India
          </CopyrightText>
          
          <BottomLinks>
            <BottomLink href="#">Privacy Policy</BottomLink>
            <BottomLink href="#">Terms of Service</BottomLink>
            <BottomLink href="#">Help & Support</BottomLink>
            <BottomLink href="#">Contact Us</BottomLink>
          </BottomLinks>
          
          <SocialIcons>
            <SocialIcon href="#" title="Twitter">𝕏</SocialIcon>
            <SocialIcon href="#" title="Facebook">f</SocialIcon>
            <SocialIcon href="#" title="Instagram">📷</SocialIcon>
          </SocialIcons>
        </BottomBar>
      </FooterContent>
    </FooterContainer>
  );
};

export default UdyamFooter;

