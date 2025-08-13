import styled from 'styled-components';
import { udyamColors } from '../../../theme/udyamColors';

export const PageContainer = styled.div`
  background: ${udyamColors.background.page};
  min-height: calc(100vh - 120px);
  padding: 15px 0;
`;

export const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

export const PageTitle = styled.h1`
  color: ${udyamColors.text.primary};
  font-size: 16px;
  font-weight: 600;
  margin: 15px 0 20px 0;
  text-align: center;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 14px;
    margin: 10px 0 15px 0;
  }
`;

export const FormSection = styled.div`
  background: ${udyamColors.form.background};
  border-radius: 0px;
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 15px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #e0e0e0;
`;

export const SectionHeader = styled.div`
  background: #2196F3;
  color: ${udyamColors.text.white};
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  font-family: "Open Sans", sans-serif;
`;

export const SectionContent = styled.div`
  padding: 25px 30px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 25px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FieldLabel = styled.label`
  color: #333;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  font-family: "Open Sans", sans-serif;
  
  span.required {
    color: #dc3545;
    margin-left: 2px;
  }
`;

export const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s ease;
  width: 100%;
  font-family: "Open Sans", sans-serif;
  
  &:focus {
    outline: none;
    border-color: #2196F3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
  }
  
  &::placeholder {
    color: #999;
    font-size: 16px;
    font-style: italic;
  }
`;



export const InfoText = styled.div`
  margin: 20px 0;
  
  ul {
    margin: 15px 0;
    padding-left: 20px;
    
    li {
      margin-bottom: 10px;
      color: #555;
      font-size: 16px;
      line-height: 1.5;
      font-family: "Open Sans", sans-serif;
      
      a {
        color: #2196F3;
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

export const ConsentSection = styled.div`
  margin: 25px 0;
  padding: 0;
  background: transparent;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Checkbox = styled.input`
  margin-top: 2px;
  width: 18px;
  height: 18px;
  accent-color: #2196F3;
  cursor: pointer;
`;

export const ConsentText = styled.div`
  font-size: 13px;
  line-height: 1.5;
  color: #333;
  font-family: "Open Sans", sans-serif;
  
  a {
    color: #2196F3;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 25px;
`;

export const PrimaryButton = styled.button`
  background: #2196F3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: "Open Sans", sans-serif;
  
  &:hover:not(:disabled) {
    background: #1976D2;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const HelperText = styled.div`
  font-size: 11px;
  color: ${udyamColors.text.muted};
  margin-top: 3px;
`;

