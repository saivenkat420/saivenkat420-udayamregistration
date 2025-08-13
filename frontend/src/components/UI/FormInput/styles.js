import styled from 'styled-components';

export const InputContainer = styled.div`
  margin-bottom: 16px;
`;

export const Label = styled.label`
  display: block;
  color: #333;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  font-family: "Open Sans", sans-serif;
  
  ${props => props.required && `
    &::after {
      content: ' *';
      color: #dc3545;
    }
  `}
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  font-family: "Open Sans", sans-serif;
  background: white;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: #999;
    font-style: italic;
  }
  
  &:focus {
    outline: none;
    border-color: #2196F3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
  }
  
  &:disabled {
    background: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }
  
  ${props => props.error && `
    border-color: #f44336;
    
    &:focus {
      border-color: #f44336;
      box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2);
    }
  `}
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  font-family: "Open Sans", sans-serif;
  background: white;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #2196F3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
  }
  
  &:disabled {
    background: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }
  
  ${props => props.error && `
    border-color: #f44336;
    
    &:focus {
      border-color: #f44336;
      box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2);
    }
  `}
`;

export const ErrorMessage = styled.div`
  color: #f44336;
  font-size: 12px;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: "Open Sans", sans-serif;
`;

export const HelperText = styled.div`
  color: #666;
  font-size: 12px;
  margin-top: 4px;
  font-family: "Open Sans", sans-serif;
`;

export const ValidationIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.valid ? '#4caf50' : '#f44336'};
`;

