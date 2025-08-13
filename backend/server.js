const express = require('express');
const cors = require('cors');
const { connectDatabase, disconnectDatabase } = require('./database/prisma');

console.log('Starting server setup...');

try {
  const udyamRoutes = require('./api/udyamRoutes');
  console.log('Routes loaded successfully');
  
  const app = express();
  const PORT = process.env.PORT || 5000;
  
  console.log('Setting up middleware...');
  
  // Middleware
  app.use(cors());
  app.use(express.json());
  
  console.log('Setting up routes...');
  
  // Routes
  app.use('/api/udyam', udyamRoutes);
  
  // Basic route
  app.get('/', (req, res) => {
    res.json({ 
      message: 'Udyam Registration API',
      description: 'Simple API for Aadhaar and PAN validation and storage',
      endpoints: {
        submit: 'POST /api/udyam/submit - Submit Aadhaar and PAN data'
      },
      status: 'Server is running'
    });
  });
  
  // Initialize database connection for Vercel
  connectDatabase().then(() => {
    console.log('Ready to accept Aadhaar and PAN submissions');
  }).catch((error) => {
    console.error('Failed to connect to database:', error);
  });

  // For Vercel, export the app instead of listening
  if (process.env.NODE_ENV !== 'production') {
    console.log('Starting server...');
    app.listen(PORT, () => {
      console.log(`Udyam Registration API running on port ${PORT}`);
    });
    
    // Graceful shutdown for local development
    process.on('SIGINT', async () => {
      console.log('\nGracefully shutting down...');
      await disconnectDatabase();
      process.exit(0);
    });
    
    process.on('SIGTERM', async () => {
      console.log('\nGracefully shutting down...');
      await disconnectDatabase();
      process.exit(0);
    });
  }
  
  // Export for Vercel
  module.exports = app;
  
} catch (error) {
  console.error('Error starting server:', error);
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
}
