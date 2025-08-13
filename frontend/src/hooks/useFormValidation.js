import { useState, useCallback } from 'react';

// Custom hook for form validation
export const useFormValidation = (validationRules = {}) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation patterns
  const patterns = {
    aadhaar: /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/,
    pan: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    mobile: /^[6-9]\d{9}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    pincode: /^[1-9][0-9]{5}$/,
    otp: /^[0-9]{6}$/
  };

  // Validate individual field
  const validateField = useCallback((name, value, rules = {}) => {
    const fieldRules = validationRules[name] || rules;
    
    // Check if field is required
    if (fieldRules.required && (!value || value.toString().trim() === '')) {
      return `${fieldRules.label || name} is required`;
    }

    // Skip other validations if field is empty and not required
    if (!value || value.toString().trim() === '') {
      return null;
    }

    // Check minimum length
    if (fieldRules.minLength && value.length < fieldRules.minLength) {
      return `${fieldRules.label || name} must be at least ${fieldRules.minLength} characters`;
    }

    // Check maximum length
    if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
      return `${fieldRules.label || name} must be at most ${fieldRules.maxLength} characters`;
    }

    // Check pattern validation
    if (fieldRules.pattern) {
      const pattern = typeof fieldRules.pattern === 'string' 
        ? new RegExp(fieldRules.pattern) 
        : fieldRules.pattern;
      
      if (!pattern.test(value)) {
        return fieldRules.errorMessage || `${fieldRules.label || name} format is invalid`;
      }
    }

    // Check predefined patterns
    if (fieldRules.type && patterns[fieldRules.type]) {
      if (!patterns[fieldRules.type].test(value)) {
        switch (fieldRules.type) {
          case 'aadhaar':
            return 'Please enter a valid 12-digit Aadhaar number';
          case 'pan':
            return 'Please enter a valid PAN number (Format: ABCDE1234F)';
          case 'mobile':
            return 'Please enter a valid 10-digit mobile number';
          case 'email':
            return 'Please enter a valid email address';
          case 'pincode':
            return 'Please enter a valid 6-digit PIN code';
          case 'otp':
            return 'Please enter a valid 6-digit OTP';
          default:
            return `Invalid ${fieldRules.label || name} format`;
        }
      }
    }

    // Check allowed values for select fields
    if (fieldRules.allowedValues && !fieldRules.allowedValues.includes(value)) {
      return `Please select a valid ${fieldRules.label || name}`;
    }

    // Custom validation function
    if (fieldRules.validate && typeof fieldRules.validate === 'function') {
      const customError = fieldRules.validate(value);
      if (customError) {
        return customError;
      }
    }

    return null;
  }, [validationRules]);

  // Validate entire form
  const validateForm = useCallback((formData, rules = validationRules) => {
    const newErrors = {};
    
    Object.keys(rules).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName], rules[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [validateField, validationRules]);

  // Set field as touched
  const setFieldTouched = useCallback((fieldName, isTouched = true) => {
    setTouched(prev => ({
      ...prev,
      [fieldName]: isTouched
    }));
  }, []);

  // Clear specific field error
  const clearFieldError = useCallback((fieldName) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Set specific field error
  const setFieldError = useCallback((fieldName, error) => {
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  }, []);

  // Check if field has error
  const hasError = useCallback((fieldName) => {
    return Boolean(errors[fieldName]);
  }, [errors]);

  // Check if field is touched
  const isFieldTouched = useCallback((fieldName) => {
    return Boolean(touched[fieldName]);
  }, [touched]);

  // Get field error message
  const getFieldError = useCallback((fieldName) => {
    return errors[fieldName] || null;
  }, [errors]);

  return {
    errors,
    touched,
    validateField,
    validateForm,
    setFieldTouched,
    clearFieldError,
    clearErrors,
    setFieldError,
    hasError,
    isFieldTouched,
    getFieldError
  };
};

export default useFormValidation;
