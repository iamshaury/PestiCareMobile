# PestiCareMobile

PestiCareMobile is a cross-platform mobile app (built with React Native and Expo) for plant disease detection using deep learning. It supports both online (backend API) and offline (on-device TFLite) inference.

---

## Features
- Diagnose plant diseases from photos
- Works online (via backend Flask API) and offline (on-device TensorFlow Lite)
- Modern, user-friendly UI
- Profile and onboarding screens

---

## Getting Started

### 1. **Clone and Install Dependencies**
```sh
npm install
```

### 2. **Run the Backend (API Mode)**
1. Go to the backend folder:
   ```sh
   cd backend
   ```
2. Install Python dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Start the backend server:
   ```sh
   python app.py
   ```
   The backend will run on `http://<your-ip>:5000/predict`.

### 3. **Run the App (Expo Go, Online Mode Only)**
```sh
npx expo start
```
- Scan the QR code with Expo Go on your phone.
- Only online (API) detection will work in Expo Go.

### 4. **Build APK for Offline (TFLite) Mode**
1. Place `plant_disease_model.tflite` in `android/app/src/main/assets/`.
2. Build a development client or APK:
   ```sh
   npx expo install expo-dev-client
   npx eas build -p android --profile development
   # or for a standalone APK
   npx eas build -p android --profile preview
   ```
3. Install the APK on your device. Offline detection will now work.

---

## Project Structure
- `app/` - React Native app source (screens, navigation)
- `assets/` - Images and fonts
- `backend/` - Flask backend, TFLite model, class indices

---

## Customization
- Update API URL in `detect.tsx` for your backend IP.
- Add/remove plant classes by updating the model and `class_indices.json`.

---

## License
MIT
