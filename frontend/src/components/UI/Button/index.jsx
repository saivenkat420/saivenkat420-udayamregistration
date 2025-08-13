import React from 'react';
import { StyledButton, LoadingSpinner } from './styles';

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

