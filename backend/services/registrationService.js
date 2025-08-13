const { prisma } = require('../database/prisma');

class RegistrationService {
  
  // Create a new Udyam registration
  async createRegistration(data) {
    try {
      const registration = await prisma.udyamRegistration.create({
        data: {
          aadhaarNumber: data.aadhaarNumber,
          entrepreneurName: data.entrepreneurName,
          panNumber: data.panNumber,
          entityType: data.entityType,
          panName: data.panName || null,
          isVerified: true // Since we're validating before storing
        }
      });
      
      console.log('Registration created successfully:', registration.id);
      return registration;
    } catch (error) {
      console.error('Failed to create registration:', error);
      
      // Handle specific Prisma errors
      if (error.code === 'P2002') {
        // Unique constraint violation
        const target = error.meta?.target;
        if (target?.includes('aadhaarNumber')) {
          throw new Error('Aadhaar number already registered');
        }
        if (target?.includes('panNumber')) {
          throw new Error('PAN number already registered');
        }
        throw new Error('Registration already exists');
      }
      
      throw new Error('Failed to save registration data');
    }
  }
  
  // Check if Aadhaar or PAN already exists
  async checkExistingRegistration(aadhaarNumber, panNumber) {
    try {
      const existing = await prisma.udyamRegistration.findFirst({
        where: {
          OR: [
            { aadhaarNumber: aadhaarNumber },
            { panNumber: panNumber }
          ]
        },
        select: {
          id: true,
          aadhaarNumber: true,
          panNumber: true,
          createdAt: true
        }
      });
      
      return existing;
    } catch (error) {
      console.error('Failed to check existing registration:', error);
      throw new Error('Failed to verify registration uniqueness');
    }
  }
  
  // Get registration stats (optional - for admin purposes)
  async getRegistrationCount() {
    try {
      const count = await prisma.udyamRegistration.count();
      return count;
    } catch (error) {
      console.error('Failed to get registration count:', error);
      return 0;
    }
  }
}

module.exports = new RegistrationService();
