import styled from 'styled-components';

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 4px;
  font-family: "Open Sans", sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: #2196F3;
          color: white;
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 600;
          
          &:hover:not(:disabled) {
            background: #1976D2;
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
        `;
      
      case 'secondary':
        return `
          background: white;
          color: #2196F3;
          border: 2px solid #2196F3;
          padding: 8px 18px;
          font-size: 14px;
          font-weight: 500;
          
          &:hover:not(:disabled) {
            background: #E3F2FD;
          }
          
          &:active:not(:disabled) {
            background: #2196F3;
            color: white;
          }
        `;
      
      case 'outline':
        return `
          background: transparent;
          color: #333;
          border: 2px solid #ccc;
          padding: 8px 18px;
          font-size: 14px;
          font-weight: 500;
          
          &:hover:not(:disabled) {
            border-color: #2196F3;
            color: #2196F3;
          }
        `;
      
      case 'ghost':
        return `
          background: transparent;
          color: #333;
          padding: 8px 18px;
          font-size: 14px;
          font-weight: 500;
          
          &:hover:not(:disabled) {
            background: #f5f5f5;
          }
        `;
      
      case 'danger':
        return `
          background: #f44336;
          color: white;
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 600;
          
          &:hover:not(:disabled) {
            background: #d32f2f;
          }
        `;
      
      default:
        return `
          background: #2196F3;
          color: white;
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 600;
        `;
    }
  }}
  
  ${props => {
    switch (props.size) {
      case 'sm':
        return `
          padding: 6px 16px;
          font-size: 12px;
          min-height: 32px;
        `;
      
      case 'lg':
        return `
          padding: 12px 24px;
          font-size: 16px;
          min-height: 48px;
        `;
      
      default:
        return `
          min-height: 40px;
        `;
    }
  }}
  
  ${props => props.fullWidth && `
    width: 100%;
  `}
`;

export const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

