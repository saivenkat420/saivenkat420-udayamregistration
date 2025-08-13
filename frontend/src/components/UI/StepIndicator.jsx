import React from 'react';
import styled from 'styled-components';
import { theme } from '../../theme';

const StepContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${theme.spacing.xl} 0;
  padding: 0 ${theme.spacing.md};
`;

const StepWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 600px;
  width: 100%;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
`;

const StepCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.base};
  margin-bottom: ${theme.spacing.sm};
  transition: ${theme.transitions.default};
  
  ${props => {
    if (props.active) {
      return `
        background: ${theme.colors.primary.blue};
        color: ${theme.colors.text.white};
        box-shadow: ${theme.shadows.md};
      `;
    } else if (props.completed) {
      return `
        background: ${theme.colors.status.success};
        color: ${theme.colors.text.white};
      `;
    } else {
      return `
        background: ${theme.colors.background.disabled};
        color: ${theme.colors.text.disabled};
        border: 2px solid ${theme.colors.border.light};
      `;
    }
  }}
`;

const StepLabel = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  text-align: center;
  color: ${props => 
    props.active ? theme.colors.primary.blue : 
    props.completed ? theme.colors.status.success : 
    theme.colors.text.disabled
  };
  max-width: 120px;
`;

const StepConnector = styled.div`
  height: 2px;
  flex: 1;
  margin: 0 ${theme.spacing.sm};
  margin-bottom: 32px;
  background: ${props => 
    props.completed ? theme.colors.status.success : theme.colors.border.light
  };
  
  @media (max-width: ${theme.breakpoints.sm}) {
    display: none;
  }
`;

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

const StepIndicator = ({ currentStep = 1, totalSteps = 2 }) => {
  const steps = [
    { id: 1, label: 'Aadhaar Verification', shortLabel: 'Aadhaar' },
    { id: 2, label: 'PAN Verification', shortLabel: 'PAN' }
  ];

  return (
    <StepContainer>
      <StepWrapper>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <Step>
              <StepCircle
                active={currentStep === step.id}
                completed={currentStep > step.id}
              >
                {currentStep > step.id ? <CheckIcon /> : step.id}
              </StepCircle>
              <StepLabel
                active={currentStep === step.id}
                completed={currentStep > step.id}
              >
                {step.label}
              </StepLabel>
            </Step>
            
            {index < steps.length - 1 && (
              <StepConnector completed={currentStep > step.id} />
            )}
          </React.Fragment>
        ))}
      </StepWrapper>
    </StepContainer>
  );
};

export default StepIndicator;
