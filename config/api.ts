// API Configuration
export const API_CONFIG = {
  // Development URL - change this to your backend server URL
  BASE_URL: 'http://localhost:5000',
  
  // For Android emulator, use: 'http://10.0.2.2:5000'
  // For iOS simulator, use: 'http://localhost:5000'
  // For physical device, use your computer's IP: 'http://192.168.1.XXX:5000'
  
  ENDPOINTS: {
    PREDICT: '/predict',
  },
  
  TIMEOUT: 30000, // 30 seconds
};

// Helper function to get the correct base URL based on platform
export const getApiBaseUrl = (): string => {
  // You can add platform-specific logic here if needed
  return API_CONFIG.BASE_URL;
};
