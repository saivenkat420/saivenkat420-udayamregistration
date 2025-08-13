import { renderHook, act } from '@testing-library/react-hooks';
import useFormValidation from './useFormValidation';

// Mock validation rules
const validationRules = {
  panNumber: {
    required: true,
    pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    label: 'PAN Number',
    errorMessage: 'Invalid PAN number format'
  }
};

describe('useFormValidation', () => {
  it('should return an error for invalid PAN number', () => {
    const { result } = renderHook(() => useFormValidation(validationRules));

    act(() => {
      result.current.validateField('panNumber', 'ABCDE1234');
    });

    expect(result.current.errors.panNumber).toBe('Invalid PAN number format');
  });

  it('should not return an error for valid PAN number', () => {
    const { result } = renderHook(() => useFormValidation(validationRules));

    act(() => {
      result.current.validateField('panNumber', 'ABCDE1234F');
    });

    expect(result.current.errors.panNumber).toBeUndefined();
  });
});
