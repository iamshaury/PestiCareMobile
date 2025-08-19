# PestiCare Mobile - Setup Guide

## Overview
PestiCare is a React Native mobile application with a Flask backend that uses AI to detect plant diseases from images.

## Backend Setup

### Prerequisites
- Python 3.8 or higher
- pip package manager

### Installation Steps

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   python -m venv venv
   
   # On Windows:
   venv\Scripts\activate
   
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Verify required files exist:**
   - `plant_disease_model.tflite` - The trained model file
   - `class_indices.json` - Class mapping file
   
   Both files should be in the `backend/` directory.

5. **Start the Flask server:**
   ```bash
   python app.py
   ```
   
   The server will start on `http://localhost:5000`

### Testing the Backend
You can test if the backend is working by visiting:
- Health check: `http://localhost:5000/health`

## Frontend Setup

### Prerequisites
- Node.js 16 or higher
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`

### Installation Steps

1. **Navigate to the project root:**
   ```bash
   cd PestiCareMobile
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API endpoint:**
   Edit `config/api.ts` and update the `BASE_URL` based on your setup:
   
   - **For iOS Simulator:** `http://localhost:5000`
   - **For Android Emulator:** `http://10.0.2.2:5000`
   - **For Physical Device:** `http://YOUR_COMPUTER_IP:5000`
   
   To find your computer's IP:
   ```bash
   # Windows:
   ipconfig
   
   # macOS/Linux:
   ifconfig
   ```

4. **Start the development server:**
   ```bash
   npx expo start
   ```

5. **Run on device/emulator:**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device

## Troubleshooting

### Backend Issues

1. **"Module not found" errors:**
   - Ensure virtual environment is activated
   - Reinstall dependencies: `pip install -r requirements.txt`

2. **Model file not found:**
   - Verify `plant_disease_model.tflite` exists in `backend/` directory
   - Check file permissions

3. **Port already in use:**
   - Change port in `app.py`: `app.run(host='0.0.0.0', port=5001)`
   - Update frontend config accordingly

### Frontend Issues

1. **Connection errors:**
   - Verify backend is running on correct port
   - Check API endpoint in `config/api.ts`
   - Ensure firewall allows connections

2. **Image picker not working:**
   - Grant camera/gallery permissions
   - Test on physical device if emulator issues persist

3. **Build errors:**
   - Clear cache: `npx expo start --clear`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

## Network Configuration

### For Physical Devices
1. Ensure your computer and mobile device are on the same WiFi network
2. Find your computer's IP address
3. Update `config/api.ts` with your computer's IP
4. Ensure Windows Firewall or macOS firewall allows connections on port 5000

### For Development
The app is configured to work with:
- **Development:** Local backend server
- **Production:** Update `config/api.ts` with production server URL

## Features
- **Plant Disease Detection:** Upload or capture plant images for AI analysis
- **Detailed Results:** Get comprehensive information about detected diseases
- **Treatment Advice:** Receive actionable recommendations for plant care
- **Multiple Plant Types:** Supports tomato, potato, and bell pepper plants

## API Endpoints
- `GET /health` - Health check
- `POST /predict` - Plant disease prediction (requires image file)

## Support
If you encounter issues:
1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Ensure both backend and frontend are running
4. Check network connectivity between devices
