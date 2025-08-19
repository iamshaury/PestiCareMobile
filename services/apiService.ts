// API Service for Plant Disease Detection
import { API_CONFIG, getApiBaseUrl } from '../config/api';

const API_BASE_URL = getApiBaseUrl();

export interface PredictionResult {
  disease_name: string;
  class: string;
  simple_name: string;
  advice: string;
  symptoms: string;
  causes: string;
  prevention: string;
  treatment: string;
  confidence: number;
  is_healthy: boolean;
}

export interface ApiResponse {
  success: boolean;
  data?: PredictionResult;
  error?: string;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async predictPlantDisease(imageUri: string): Promise<ApiResponse> {
    try {
      // Create FormData for multipart/form-data request
      const formData = new FormData();
      
      // For React Native, we need to handle the image differently
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'plant_image.jpg',
      } as any);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const apiResponse = await fetch(`${this.baseUrl}/predict`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        throw new Error(`HTTP ${apiResponse.status}: ${errorText}`);
      }

      const result = await apiResponse.json();
      
      return {
        success: true,
        data: result as PredictionResult,
      };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Test connection to backend
  async testConnection(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
      
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }

  // Update base URL (useful for switching between development and production)
  updateBaseUrl(newUrl: string): void {
    this.baseUrl = newUrl;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default ApiService;
