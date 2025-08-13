const { prisma } = require('../database/prisma');

class RegistrationService {
  
  // Create a new Udyam registration
  async createRegistration(data) {
    try {
      // Ensure database connection
      await prisma.$connect();

      // Log the data being sent to Prisma
      console.log('Creating registration with data:', {
        ...data,
        aadhaarNumber: data.aadhaarNumber?.substring(0, 4) + '****'
      });

      const registration = await prisma.udyamRegistration.create({
        data: {
          aadhaarNumber: data.aadhaarNumber,
          entrepreneurName: data.entrepreneurName,
          panNumber: data.panNumber,
          entityType: data.entityType,
          panName: data.panName || data.entrepreneurName, // Use entrepreneur name if PAN name not provided
          isVerified: true // Since we're validating before storing
        }
      });
      
      console.log('Registration created successfully:', registration.id);
      return registration;
    } catch (error) {
      console.error('Failed to create registration:', {
        error: error.message,
        code: error.code,
        meta: error.meta
      });
      
      // Handle specific Prisma errors
      if (error.code === 'P2002') {
        // Unique constraint violation
        const target = error.meta?.target?.[0] || '';
        if (target.includes('aadhaarNumber')) {
          throw new Error('Aadhaar number already registered');
        }
        if (target.includes('panNumber')) {
          throw new Error('PAN number already registered');
        }
        throw new Error('Registration already exists');
      }

      if (error.code === 'P1001') {
        throw new Error('Unable to connect to database');
      }
      
      if (error.code === 'P2000') {
        throw new Error('Invalid data format');
      }
      
      throw new Error(`Database error: ${error.message}`);
    } finally {
      // Ensure connection is closed in serverless environment
      await prisma.$disconnect();
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
