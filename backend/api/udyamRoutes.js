const express = require('express');
const router = express.Router();
const registrationService = require('../services/registrationService');

// Simple validation function for Aadhaar and PAN
const validateFormData = (formData) => {
  const errors = [];
  
  // Aadhaar validation
  if (!formData.aadhaarNumber) {
    errors.push('Aadhaar number is required');
  } else if (!/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/.test(formData.aadhaarNumber)) {
    errors.push('Invalid Aadhaar number format');
  }
  
  // Entrepreneur name validation
  if (!formData.entrepreneurName) {
    errors.push('Entrepreneur name is required');
  } else if (formData.entrepreneurName.length < 2) {
    errors.push('Entrepreneur name must be at least 2 characters');
  }
  
  // PAN validation
  if (!formData.panNumber) {
    errors.push('PAN number is required');
  } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
    errors.push('Invalid PAN number format');
  }
  
  // Entity type validation
  if (!formData.entityType) {
    errors.push('Entity type is required');
  }
  
  return errors;
};

// Store form submission in PostgreSQL database
router.post('/submit', async (req, res) => {
  try {
    const formData = req.body;
    console.log('Received form data for submission:', {
      aadhaar: formData.aadhaarNumber?.substring(0, 4) + '****',
      entrepreneur: formData.entrepreneurName,
      pan: formData.panNumber,
      entity: formData.entityType
    });
    
    console.log('Full form data for debugging:', formData);
    
    // 1. Validate the form data
    const errors = validateFormData(formData);
    
    if (errors.length > 0) {
      return res.status(400).json({ 
        success: false, 
        errors,
        message: 'Form validation failed'
      });
    }
    
    // 2. Check for existing registrations
    console.log('Checking for existing registration...');
    const existingRegistration = await registrationService.checkExistingRegistration(
      formData.aadhaarNumber,
      formData.panNumber
    );
    
    console.log('Existing registration check result:', existingRegistration);
    
    if (existingRegistration) {
      console.log('Found existing registration, returning conflict');
      return res.status(409).json({
        success: false,
        message: 'Registration already exists',
        details: {
          registrationId: existingRegistration.id,
          registeredOn: existingRegistration.createdAt
        }
      });
    }
    
    console.log('No existing registration found, proceeding to save...');
    
    // 3. Store in PostgreSQL database using Prisma
    const registrationData = {
      aadhaarNumber: formData.aadhaarNumber,
      entrepreneurName: formData.entrepreneurName,
      panNumber: formData.panNumber,
      entityType: formData.entityType,
      panName: formData.panName // Optional field from PAN verification
    };
    
    console.log('Attempting to save registration with data:', registrationData);
    
    const savedRegistration = await registrationService.createRegistration(registrationData);
    
    console.log('Registration saved successfully to PostgreSQL:', savedRegistration.id);
    
    // 4. Return success response
    res.status(201).json({ 
      success: true, 
      message: 'Udyam registration submitted successfully',
      registrationId: savedRegistration.id,
      data: {
        id: savedRegistration.id,
        aadhaarNumber: formData.aadhaarNumber,
        entrepreneurName: formData.entrepreneurName,
        panNumber: formData.panNumber,
        entityType: formData.entityType,
        submittedAt: savedRegistration.createdAt,
        isVerified: savedRegistration.isVerified
      }
    });
    
  } catch (error) {
    console.error('Form submission error:', error);
    
    // Handle specific database errors
    if (error.message.includes('already registered')) {
      return res.status(409).json({
        success: false,
        error: error.message,
        message: 'Duplicate registration detected'
      });
    }
    
    // Log detailed error for debugging
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      meta: error.meta
    });

    // Return appropriate error response
    res.status(500).json({ 
      success: false, 
      error: {
        code: error.code || '500',
        message: error.message || 'Form submission failed due to server error'
      }
    });
  }
});

module.exports = router;
