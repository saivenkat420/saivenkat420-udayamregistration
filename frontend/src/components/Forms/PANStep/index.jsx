import React, { useState } from 'react';
import {
  FormCard,
  FormCardHeader,
  FormCardContent,
  FormGrid,
  FormField,
  FieldLabel,
  Input,
  SelectInput,
  ErrorText,
  SuccessText,
  ValidationIcon,
  InputWrapper,
  ConsentSection,
  CheckboxWrapper,
  Checkbox,
  ConsentText,
  ButtonContainer,
  PrimaryButton,
  ButtonGroup,
  SuccessMessage,
  DetailsSection,
  DetailRow,
  DetailLabel,
  DetailValue
} from './styles';

const PANStep = ({ onNext, onPrevious, formData, setFormData, isSubmitting = false, submissionError = '' }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [panDetails, setPanDetails] = useState(null);
  const [errors, setErrors] = useState({});

  // PAN validation pattern
  const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  const entityTypes = [
    { value: 'proprietary', label: '1. Proprietary / एकल स्वामित्व' },
    { value: 'huf', label: '2. Hindu Undivided Family / हिंदू अविभाजित परिवार (एचयूएफ)' },
    { value: 'partnership', label: '3. Partnership / पार्टनरशिप' },
    { value: 'cooperative', label: '4. Co-Operative / सहकारी' },
    { value: 'private_limited', label: '5. Private Limited Company / प्राइवेट लिमिटेड कंपनी' },
    { value: 'public_limited', label: '6. Public Limited Company / पब्लिक लिमिटेड कंपनी' },
    { value: 'self_help_group', label: '7. Self Help Group / स्वयं सहायता समूह' },
    { value: 'llp', label: '8. Limited Liability Partnership / सीमित दायित्व भागीदारी' },
    { value: 'society', label: '9. Society / सोसाइटी' },
    { value: 'trust', label: '10. Trust / ट्रस्ट' },
    { value: 'others', label: '11. Others / अन्य' }
  ];

  const validatePAN = (pan) => {
    if (!pan) {
      return 'PAN number is required';
    }
    
    if (pan.length < 10) {
      return 'PAN must be 10 characters long';
    }
    
    if (pan.length === 10) {
      // Check first 5 characters are letters
      if (!/^[A-Z]{5}/.test(pan)) {
        return 'First 5 characters must be letters';
      }
      
      // Check next 4 characters are numbers
      if (!/^[A-Z]{5}[0-9]{4}/.test(pan)) {
        return 'Characters 6-9 must be numbers';
      }
      
      // Check last character is a letter
      if (!panPattern.test(pan)) {
        return 'Last character must be a letter';
      }
    }
    
    return null;
  };

  const validateEntityType = (entityType) => {
    if (!entityType) {
      return 'Please select entity type';
    }
    return null;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'pan') {
      // For PAN: Convert to uppercase, allow only alphanumeric, max 10 chars
      const cleanValue = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: cleanValue }));
      
      // Real-time PAN validation
      if (cleanValue.length > 0) {
        const panError = validatePAN(cleanValue);
        setErrors(prev => ({ ...prev, pan: panError }));
      } else {
        setErrors(prev => ({ ...prev, pan: null }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: null }));
      }
    }
  };

  const handleVerifyPAN = async () => {
    const panError = validatePAN(formData.pan);
    const entityError = validateEntityType(formData.entityType);
    
    if (panError || entityError) {
      setErrors({
        pan: panError,
        entityType: entityError
      });
      return;
    }

    setIsVerifying(true);
    
    try {
      // TODO: Integrate with actual PAN verification API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const panDetails = {
        panNumber: formData.pan,
        name: formData.panHolderName || 'PAN Holder Name', 
        entityType: entityTypes.find(type => type.value === formData.entityType)?.label,
        status: 'Valid',
        lastUpdated: new Date().toLocaleDateString('en-IN')
      };
      
      setPanDetails(panDetails);
      setIsVerified(true);
      setErrors({});
    } catch (error) {
      setErrors({ pan: 'Failed to verify PAN. Please check the details and try again.' });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = () => {
    if (isVerified && panDetails && !isSubmitting) {
      // Store verified PAN details
      setFormData(prev => ({
        ...prev,
        pan: formData.pan,
        entityType: formData.entityType,
        panDetails: panDetails,
        verified: true
      }));
      
      onNext();
    }
  };

  return (
    <FormCard>
      <FormCardHeader>
        PAN Verification
      </FormCardHeader>
      
      <FormCardContent>
        <FormGrid>
          <FormField>
            <FieldLabel>
              3. Type of Organisation / संगठन के प्रकार
            </FieldLabel>
            <SelectInput
              name="entityType"
              value={formData.entityType || ''}
              onChange={handleInputChange}
              disabled={isVerified}
            >
              <option value="">Type of Organisation / संगठन के प्रकार</option>
              {entityTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </SelectInput>
            {errors.entityType && (
              <ErrorText>{errors.entityType}</ErrorText>
            )}
          </FormField>
          
          <FormField>
            <FieldLabel>
              4.1 PAN/ पैन
            </FieldLabel>
            <InputWrapper>
              <Input
                type="text"
                name="pan"
                value={formData.pan || ''}
                onChange={handleInputChange}
                placeholder="ENTER PAN NUMBER"
                maxLength={10}
                disabled={isVerified}
                error={!!errors.pan}
                valid={formData.pan && formData.pan.length === 10 && !errors.pan}
                style={{ 
                  textTransform: 'uppercase',
                  paddingRight: formData.pan && formData.pan.length > 0 ? '40px' : '12px'
                }}
              />
              {formData.pan && formData.pan.length > 0 && (
                <ValidationIcon valid={formData.pan.length === 10 && !errors.pan}>
                  {formData.pan.length === 10 && !errors.pan ? '✓' : '✗'}
                </ValidationIcon>
              )}
            </InputWrapper>
            {errors.pan && (
              <ErrorText>{errors.pan}</ErrorText>
            )}
            {formData.pan && formData.pan.length === 10 && !errors.pan && (
              <SuccessText>
                <span>✓</span>
                Valid PAN format
              </SuccessText>
            )}
          </FormField>
        </FormGrid>

        <FormGrid>
          <FormField>
            <FieldLabel>
              4.1.1 Name of PAN Holder / पैन धारक का नाम
            </FieldLabel>
            <Input
              type="text"
              name="panHolderName"
              value={formData.panHolderName || ''}
              onChange={handleInputChange}
              placeholder="Name as per PAN"
              disabled={isVerified}
            />
          </FormField>
          
          <FormField>
            <FieldLabel>
              4.1.2 DOB or DOI as per PAN / पैन के अनुसार जन्म तिथि या निगमन तिथि
            </FieldLabel>
            <Input
              type="text"
              name="dob"
              value={formData.dob || ''}
              onChange={handleInputChange}
              placeholder="DD/MM/YYYY"
              disabled={isVerified}
            />
          </FormField>
        </FormGrid>

        <ConsentSection>
          <CheckboxWrapper>
            <Checkbox
              type="checkbox"
              name="panConsent"
              checked={formData.panConsent || false}
              onChange={handleInputChange}
              id="panConsent"
              disabled={isVerified}
            />
            <ConsentText>
              <label htmlFor="panConsent">
                I, the holder of the above PAN, hereby give my consent to Ministry of MSME, Government of India, for using my data/ information available in the Income Tax Returns filed by me, and also the same available in the GST Returns and also from other Government organizations, for MSME classification and other official purposes, in pursuance of the MSMED Act, 2006.
              </label>
            </ConsentText>
          </CheckboxWrapper>
        </ConsentSection>

        <ButtonContainer>
          {!isVerified && (
            <PrimaryButton
              onClick={handleVerifyPAN}
              disabled={!formData.pan || !formData.entityType || !formData.panConsent || isVerifying}
            >
              {isVerifying ? 'Validating...' : 'PAN Validate'}
            </PrimaryButton>
          )}
        </ButtonContainer>

        {isVerified && panDetails && (
          <>
            <SuccessMessage>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              PAN verified successfully!
            </SuccessMessage>

            <DetailsSection>
              <h4>Verified PAN Details</h4>
              
              <DetailRow>
                <DetailLabel>PAN Number:</DetailLabel>
                <DetailValue>{panDetails.panNumber}</DetailValue>
              </DetailRow>
              
              <DetailRow>
                <DetailLabel>Name as per PAN:</DetailLabel>
                <DetailValue>{panDetails.name}</DetailValue>
              </DetailRow>
              
              <DetailRow>
                <DetailLabel>Entity Type:</DetailLabel>
                <DetailValue>{panDetails.entityType}</DetailValue>
              </DetailRow>
              
              <DetailRow>
                <DetailLabel>Status:</DetailLabel>
                <DetailValue>{panDetails.status}</DetailValue>
              </DetailRow>
              
              <DetailRow>
                <DetailLabel>Last Updated:</DetailLabel>
                <DetailValue>{panDetails.lastUpdated}</DetailValue>
              </DetailRow>
            </DetailsSection>

            {submissionError && (
              <div style={{
                marginBottom: '16px',
                padding: '12px',
                backgroundColor: '#f8d7da',
                border: '1px solid #f5c6cb',
                borderRadius: '4px',
                color: '#721c24'
              }}>
                Error: {submissionError}
              </div>
            )}

            <ButtonGroup>
              <PrimaryButton
                onClick={() => {
                  setIsVerified(false);
                  setPanDetails(null);
                }}
                style={{ background: '#6c757d' }}
                disabled={isSubmitting}
              >
                Edit Details
              </PrimaryButton>
              
              <PrimaryButton
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </PrimaryButton>
            </ButtonGroup>
          </>
        )}
      </FormCardContent>
    </FormCard>
  );
};

export default PANStep;
