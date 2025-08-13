import styled from 'styled-components';
import { udyamColors } from '../../../theme/udyamColors';

export const FormCard = styled.div`
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

export const FormCardHeader = styled.div`
  background: #28a745;
  color: ${udyamColors.text.white};
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  font-family: "Open Sans", sans-serif;
`;

export const FormCardContent = styled.div`
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
  border: 1px solid ${props => 
    props.error ? '#dc3545' : 
    props.valid ? '#28a745' : '#ccc'
  };
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s ease;
  width: 100%;
  font-family: "Open Sans", sans-serif;
  background: ${props => 
    props.error ? '#fff5f5' : 
    props.valid ? '#f8fff8' : '#ffffff'
  };
  
  &:focus {
    outline: none;
    border-color: ${props => 
      props.error ? '#dc3545' : 
      props.valid ? '#28a745' : '#2196F3'
    };
    box-shadow: 0 0 0 2px ${props => 
      props.error ? 'rgba(220, 53, 69, 0.2)' : 
      props.valid ? 'rgba(40, 167, 69, 0.2)' : 'rgba(33, 150, 243, 0.2)'
    };
  }
  
  &::placeholder {
    color: #999;
    font-size: 14px;
    font-style: italic;
  }
`;

export const SelectInput = styled.select`
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s ease;
  width: 100%;
  font-family: "Open Sans", sans-serif;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #2196F3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
  }
`;

export const ErrorText = styled.div`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
  font-family: "Open Sans", sans-serif;
`;

export const SuccessText = styled.div`
  color: #28a745;
  font-size: 12px;
  margin-top: 4px;
  font-family: "Open Sans", sans-serif;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ValidationIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.valid ? '#28a745' : '#dc3545'};
  font-size: 16px;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
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

export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 25px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SuccessMessage = styled.div`
  background: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
  padding: 15px 20px;
  border-radius: 4px;
  margin: 20px 0;
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const DetailsSection = styled.div`
  background: #f8f9fa;
  border-radius: 4px;
  padding: 20px;
  margin-top: 20px;
  
  h4 {
    margin: 0 0 15px 0;
    color: #333;
    font-size: 16px;
    font-weight: 600;
    font-family: "Open Sans", sans-serif;
  }
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`;

export const DetailLabel = styled.span`
  font-weight: 500;
  color: #333;
  font-family: "Open Sans", sans-serif;
`;

export const DetailValue = styled.span`
  color: #666;
  text-align: right;
  font-family: "Open Sans", sans-serif;
  
  @media (max-width: 768px) {
    text-align: left;
  }
`;
