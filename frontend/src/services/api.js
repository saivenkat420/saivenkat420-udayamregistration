import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data);
    
    // Handle common errors
    if (error.response?.status === 404) {
      console.error('API endpoint not found');
    } else if (error.response?.status === 500) {
      console.error('Server error occurred');
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    }
    
    return Promise.reject(error);
  }
);

// API service methods
export const udyamApi = {
  // Get validation rules from backend
  getValidationRules: async () => {
    try {
      const response = await api.get('/udyam/rules');
      return response.data;
    } catch (error) {
      console.error('Error fetching validation rules:', error);
      throw new Error('Failed to fetch validation rules from server');
    }
  },


  // Validate form data
  validateFormData: async (formData) => {
    try {
      const response = await api.post('/udyam/validate', formData);
      return response.data;
    } catch (error) {
      console.error('Error validating form data:', error);
      if (error.response?.status === 400) {
        // Return validation errors from server
        return error.response.data;
      }
      throw new Error('Failed to validate form data');
    }
  },

  // Submit form data
  submitFormData: async (formData) => {
    try {
      const response = await api.post('/udyam/submit', formData);
      return response.data;
    } catch (error) {
      console.error('Error submitting form data:', error);
      if (error.response?.status === 400) {
        // Return validation errors from server
        return error.response.data;
      }
      throw new Error('Failed to submit form data');
    }
  },

};

export default api;
