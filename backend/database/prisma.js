const { PrismaClient } = require('@prisma/client');

// Initialize Prisma Client with global caching for serverless
const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['error'], // Minimal logging for production
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Database connection test
const connectDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

// Graceful shutdown
const disconnectDatabase = async () => {
  try {
    await prisma.$disconnect();
    console.log('Database disconnected successfully');
  } catch (error) {
    console.error('Database disconnection failed:', error);
  }
};

module.exports = {
  prisma,
  connectDatabase,
  disconnectDatabase
};
