import React from 'react';
import styled from 'styled-components';
import { theme } from '../../theme';

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.medium};
  font-family: ${theme.typography.fontFamily.primary};
  cursor: pointer;
  transition: ${theme.transitions.default};
  text-decoration: none;
  min-height: 44px;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: ${theme.colors.primary.blue};
          color: ${theme.colors.text.white};
          box-shadow: ${theme.shadows.sm};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primary.darkBlue};
            box-shadow: ${theme.shadows.md};
            transform: translateY(-1px);
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: ${theme.shadows.sm};
          }
        `;
      
      case 'secondary':
        return `
          background: ${theme.colors.background.primary};
          color: ${theme.colors.primary.blue};
          border: 2px solid ${theme.colors.primary.blue};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primary.lightBlue};
          }
          
          &:active:not(:disabled) {
            background: ${theme.colors.primary.blue};
            color: ${theme.colors.text.white};
          }
        `;
      
      case 'outline':
        return `
          background: transparent;
          color: ${theme.colors.text.primary};
          border: 2px solid ${theme.colors.border.medium};
          
          &:hover:not(:disabled) {
            border-color: ${theme.colors.primary.blue};
            color: ${theme.colors.primary.blue};
          }
        `;
      
      case 'ghost':
        return `
          background: transparent;
          color: ${theme.colors.text.primary};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.background.secondary};
          }
        `;
      
      case 'danger':
        return `
          background: ${theme.colors.status.error};
          color: ${theme.colors.text.white};
          
          &:hover:not(:disabled) {
            background: #d32f2f;
          }
        `;
      
      default:
        return `
          background: ${theme.colors.primary.blue};
          color: ${theme.colors.text.white};
        `;
    }
  }}
  
  ${props => {
    switch (props.size) {
      case 'sm':
        return `
          padding: ${theme.spacing.xs} ${theme.spacing.md};
          font-size: ${theme.typography.fontSize.sm};
          min-height: 36px;
        `;
      
      case 'lg':
        return `
          padding: ${theme.spacing.md} ${theme.spacing.xl};
          font-size: ${theme.typography.fontSize.lg};
          min-height: 52px;
        `;
      
      default:
        return '';
    }
  }}
  
  ${props => props.fullWidth && `
    width: 100%;
  `}
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: ${theme.borderRadius.full};
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Button = ({
  children,
  variant = 'primary',
  size = 'base',
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {!loading && children}
    </StyledButton>
  );
};

export default Button;
