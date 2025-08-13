import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme';

const InputContainer = styled.div`
  margin-bottom: ${theme.spacing.form.fieldGap};
`;

const Label = styled.label`
  display: block;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
  
  ${props => props.required && `
    &::after {
      content: ' *';
      color: ${theme.colors.status.error};
    }
  `}
`;

const InputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.form.fieldBorder};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.base};
  font-family: ${theme.typography.fontFamily.primary};
  background: ${theme.colors.form.fieldBg};
  transition: ${theme.transitions.default};
  
  &::placeholder {
    color: ${theme.colors.form.placeholder};
  }
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.form.fieldFocus};
    box-shadow: 0 0 0 3px ${theme.colors.form.fieldFocus}20;
  }
  
  &:disabled {
    background: ${theme.colors.background.disabled};
    color: ${theme.colors.text.disabled};
    cursor: not-allowed;
  }
  
  ${props => props.error && `
    border-color: ${theme.colors.form.fieldError};
    
    &:focus {
      border-color: ${theme.colors.form.fieldError};
      box-shadow: 0 0 0 3px ${theme.colors.form.fieldError}20;
    }
  `}
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.form.fieldBorder};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.base};
  font-family: ${theme.typography.fontFamily.primary};
  background: ${theme.colors.form.fieldBg};
  transition: ${theme.transitions.default};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.form.fieldFocus};
    box-shadow: 0 0 0 3px ${theme.colors.form.fieldFocus}20;
  }
  
  &:disabled {
    background: ${theme.colors.background.disabled};
    color: ${theme.colors.text.disabled};
    cursor: not-allowed;
  }
  
  ${props => props.error && `
    border-color: ${theme.colors.form.fieldError};
    
    &:focus {
      border-color: ${theme.colors.form.fieldError};
      box-shadow: 0 0 0 3px ${theme.colors.form.fieldError}20;
    }
  `}
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.status.error};
  font-size: ${theme.typography.fontSize.sm};
  margin-top: ${theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const HelperText = styled.div`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.sm};
  margin-top: ${theme.spacing.xs};
`;

const ValidationIcon = styled.div`
  position: absolute;
  right: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.valid ? theme.colors.status.success : theme.colors.status.error};
`;

const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  helperText,
  options = [],
  showValidation = false,
  pattern,
  maxLength,
  onBlur,
  ...props
}) => {
  const [touched, setTouched] = useState(false);
  
  const handleBlur = (e) => {
    setTouched(true);
    if (onBlur) onBlur(e);
  };
  
  const isValid = value && !error && pattern ? pattern.test(value) : value && !error;
  const showValidationIcon = showValidation && touched && value;
  
  const renderInput = () => {
    if (type === 'select') {
      return (
        <StyledSelect
          name={name}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          disabled={disabled}
          error={error}
          required={required}
          {...props}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
      );
    }
    
    return (
      <StyledInput
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        required={required}
        maxLength={maxLength}
        {...props}
      />
    );
  };
  
  return (
    <InputContainer>
      {label && (
        <Label htmlFor={name} required={required}>
          {label}
        </Label>
      )}
      
      <InputWrapper>
        {renderInput()}
        
        {showValidationIcon && (
          <ValidationIcon valid={isValid}>
            {isValid ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            )}
          </ValidationIcon>
        )}
      </InputWrapper>
      
      {error && (
        <ErrorMessage>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
          </svg>
          {error}
        </ErrorMessage>
      )}
      
      {helperText && !error && (
        <HelperText>{helperText}</HelperText>
      )}
    </InputContainer>
  );
};

export default FormInput;
