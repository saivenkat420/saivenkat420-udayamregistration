import React, { useState } from 'react';
import {
  InputContainer,
  Label,
  InputWrapper,
  StyledInput,
  StyledSelect,
  ErrorMessage,
  HelperText,
  ValidationIcon
} from './styles';

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

