// Environment configuration
export const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  appName: process.env.REACT_APP_NAME || 'Udyam Registration Portal',
  version: process.env.REACT_APP_VERSION || '1.0.0',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

export default config;
