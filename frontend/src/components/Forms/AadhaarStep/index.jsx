import React, { useState, useEffect } from 'react';
import PANStep from '../PANStep';
import { udyamApi } from '../../../services/api';
import {
  PageContainer,
  MainContent,
  FormSection,
  SectionHeader,
  SectionContent,
  FormGrid,
  FormField,
  FieldLabel,
  Input,
  InfoText,
  ConsentSection,
  CheckboxWrapper,
  Checkbox,
  ConsentText,
  ButtonContainer,
  PrimaryButton,
  HelperText
} from './styles';

const AadhaarStep = () => {
  const [formData, setFormData] = useState({
    aadhaarNumber: '',
    entrepreneurName: '',
    consent: false,
    otp: ''
  });
  
  const [panFormData, setPanFormData] = useState({});
  const [showOTP, setShowOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  
  // Final submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [registrationId, setRegistrationId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // For OTP, only allow numbers and limit to 6 digits
    if (name === 'otp') {
      const numericValue = value.replace(/\D/g, '').slice(0, 6);
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
      // Clear error when user starts typing
      if (otpError) {
        setOtpError('');
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleGenerateOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // TODO: Integrate with actual Aadhaar OTP API
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowOTP(true);
    } catch (error) {
      console.error('Failed to generate OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidateOTP = (e) => {
    e.preventDefault();
    
    // Validate 6-digit OTP
    if (!formData.otp) {
      setOtpError('OTP is required');
      return;
    }
    
    if (formData.otp.length !== 6) {
      setOtpError('Please enter a valid 6-digit OTP');
      return;
    }
    
    // TODO: Integrate with actual OTP verification API
    console.log('OTP Validated successfully:', formData);
    setOtpVerified(true);
  };

  // Handle final form submission to backend
  const handleFinalSubmission = async () => {
    setIsSubmitting(true);
    setSubmissionError('');
    
    try {
      // Combine Aadhaar and PAN data
      const completeFormData = {
        aadhaarNumber: formData.aadhaarNumber,
        entrepreneurName: formData.entrepreneurName,
        panNumber: panFormData.pan,
        entityType: panFormData.entityType,
        panName: panFormData.panDetails?.name || null
      };
      
      console.log('Submitting complete form data:', completeFormData);
      
      // Submit to backend API
      const response = await udyamApi.submitFormData(completeFormData);
      
      if (response.success) {
        setSubmissionSuccess(true);
        setRegistrationId(response.registrationId);
        console.log('Registration successful:', response);
        
        // Reset form to default state after successful submission
        setTimeout(() => {
          resetFormToDefault();
        }, 3000); // Show success message for 3 seconds then reset
      } else {
        setSubmissionError(response.message || 'Submission failed');
      }
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionError(error.message || 'Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form to default state
  const resetFormToDefault = () => {
    // Reset Aadhaar form data
    setFormData({
      aadhaarNumber: '',
      entrepreneurName: '',
      consent: false,
      otp: ''
    });
    
    // Reset PAN form data
    setPanFormData({});
    
    // Reset all states
    setShowOTP(false);
    setIsLoading(false);
    setOtpError('');
    setOtpVerified(false);
    setIsSubmitting(false);
    setSubmissionSuccess(false);
    setSubmissionError('');
    setRegistrationId(null);
    
    console.log('Form reset to default state');
  };

  return (
    <PageContainer>
      <MainContent>
        <FormSection>
          <SectionHeader>
            Aadhaar Verification With OTP
          </SectionHeader>
          
          <SectionContent>
            <FormGrid>
              <FormField>
                <FieldLabel>
                  1. Aadhaar Number/ आधार संख्या <span className="required">*</span>
                </FieldLabel>
                <Input
                  type="text"
                  name="aadhaarNumber"
                  value={formData.aadhaarNumber}
                  onChange={handleInputChange}
                  placeholder="Your Aadhaar No"
                  maxLength="12"
                  disabled={showOTP}
                  style={{ backgroundColor: showOTP ? '#f5f5f5' : '#ffffff' }}
                />
                <HelperText>Format: XXXX XXXX XXXX</HelperText>
              </FormField>
              
              <FormField>
                <FieldLabel>
                  2. Name of Entrepreneur / उद्यमी का नाम <span className="required">*</span>
                </FieldLabel>
                <Input
                  type="text"
                  name="entrepreneurName"
                  value={formData.entrepreneurName}
                  onChange={handleInputChange}
                  placeholder="Name as per Aadhaar"
                  disabled={showOTP}
                  style={{ backgroundColor: showOTP ? '#f5f5f5' : '#ffffff' }}
                />
              </FormField>
            </FormGrid>
            
            <InfoText>
              <ul>
                <li>Aadhaar number shall be required for Udyam Registration.</li>
                <li>The Aadhaar number shall be of the proprietor in the case of a proprietorship firm, of the managing partner in the case of a partnership firm and of a karta in the case of a Hindu Undivided Family (HUF).</li>
                <li>In case of a Company or a Limited Liability Partnership or a Cooperative Society or a Society or a Trust, the organisation or its authorised signatory shall provide its GSTIN(As per applicability of CGST Act 2017 and as notified by the ministry of MSME <a href="#" target="_blank">vide S.O. 1055(E) dated 05th March 2021</a>) and PAN along with its Aadhaar number.</li>
              </ul>
            </InfoText>
            
            <ConsentSection>
              <CheckboxWrapper>
                <Checkbox
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  id="consent"
                  disabled={showOTP}
                />
                <ConsentText>
                  <label htmlFor="consent">
                    I, the holder of the above Aadhaar, hereby give my consent to Ministry of MSME, Government of India, for using my Aadhaar number as alloted by UIDAI for Udyam Registration. NIC / Ministry of MSME, Government of India, have informed me that my aadhaar data will not be stored/shared. / मैं, आधार धारक, इस प्रकार उद्यम पंजीकरण के लिए यूआईडीएआई के साथ अपने आधार संख्या का उपयोग करने के लिए सूक्ष्म मध्यम, भारत सरकार की अपनी सहमति देता हूं। एनआईसी / सूक्ष्म मध्यम, भारत सरकार ने मुझे सूचित किया है कि मेरा आधार डेटा संग्रहीत / साझा नहीं किया जाएगा।
                  </label>
                </ConsentText>
              </CheckboxWrapper>
            </ConsentSection>
            
            {/* OTP Section - Shows after Generate OTP is clicked */}
            {showOTP && !otpVerified && (
              <div style={{ marginTop: '25px', paddingTop: '25px', borderTop: '1px solid #e0e0e0' }}>
                <FormField>
                  <FieldLabel>
                    *Enter One Time Password(OTP) Code
                  </FieldLabel>
                  <Input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    placeholder="OTP code"
                    maxLength="6"
                    style={{ 
                      maxWidth: '200px',
                      fontSize: '16px',
                      textAlign: 'center',
                      letterSpacing: '2px'
                    }}
                  />
                  {otpError && (
                    <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                      {otpError}
                    </div>
                  )}
                  <div style={{ 
                    fontSize: '14px', 
                    color: '#666', 
                    marginTop: '8px',
                    fontFamily: '"Open Sans", sans-serif'
                  }}>
                    OTP has been sent to *******4023
                  </div>
                </FormField>
              </div>
            )}

            {/* Success Message - Shows after OTP verification */}
            {otpVerified && (
              <div style={{ 
                background: '#d4edda',
                border: '1px solid #c3e6cb',
                color: '#155724',
                padding: '15px 20px',
                borderRadius: '4px',
                margin: '20px 0',
                fontFamily: '"Open Sans", sans-serif',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Your Aadhaar has been successfully verified. You can continue Udyam Registration process.
              </div>
            )}
            
            <ButtonContainer>
              {!showOTP ? (
                <PrimaryButton
                  onClick={handleGenerateOTP}
                  disabled={!formData.aadhaarNumber || !formData.entrepreneurName || !formData.consent || isLoading}
                >
                  {isLoading ? 'Generating OTP...' : 'Validate & Generate OTP'}
                </PrimaryButton>
              ) : !otpVerified ? (
                <PrimaryButton
                  onClick={handleValidateOTP}
                  disabled={!formData.otp || formData.otp.length !== 6}
                >
                  Validate
                </PrimaryButton>
              ) : null}
            </ButtonContainer>
          </SectionContent>
        </FormSection>

        {/* PAN Section - Shows after OTP verification */}
        {otpVerified && !submissionSuccess && (
          <div style={{ marginTop: '30px' }}>
            <PANStep 
              formData={panFormData}
              setFormData={setPanFormData}
              onNext={handleFinalSubmission}
              onPrevious={() => setOtpVerified(false)}
              isSubmitting={isSubmitting}
              submissionError={submissionError}
            />
          </div>
        )}

        {/* Success Message */}
        {submissionSuccess && (
          <div style={{ 
            marginTop: '30px', 
            padding: '24px', 
            backgroundColor: '#d4edda', 
            border: '1px solid #c3e6cb', 
            borderRadius: '6px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#155724', marginBottom: '12px' }}>
              Registration Submitted Successfully!
            </h3>
            <p style={{ color: '#155724', marginBottom: '16px' }}>
              Your Udyam registration has been submitted and saved to our database.
            </p>
            {registrationId && (
              <p style={{ color: '#155724', fontWeight: 'bold' }}>
                Registration ID: {registrationId}
              </p>
            )}
            <button
              onClick={resetFormToDefault}
              style={{
                marginTop: '16px',
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Submit Another Registration
            </button>
          </div>
        )}
      </MainContent>
    </PageContainer>
  );
};

export default AadhaarStep;

