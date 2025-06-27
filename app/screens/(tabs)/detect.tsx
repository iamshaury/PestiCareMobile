// Detect.tsx
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as React from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Card, DefaultTheme, IconButton, Provider as PaperProvider, Paragraph, Title } from 'react-native-paper';

const plantTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6BCB77',
    accent: '#B5E61D',
    background: '#E6FCD9',
    surface: '#FFFFFF',
    text: '#222',
  },
};

export default function Detect() {
  const [image, setImage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<any>(null);
  const [modalVisible, setModalVisible] = React.useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission Required: Please allow access to gallery.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission Required: Please allow camera access.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 1 });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const detectDisease = async () => {
    if (!image) return;
    let timeoutId: any = null;
    try {
      setLoading(true);
      setResult(null);
      const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error('Request timed out. Please try again.')), 15000);
      });
      const response = await fetch(image);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append('image', {
        uri: image,
        name: 'image.jpg',
        type: 'image/jpeg',
      } as any);
      const API_URL = 'http://192.168.219.26:5000/predict';
      const fetchPromise = fetch(API_URL, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });
      const result = await Promise.race([fetchPromise, timeoutPromise]);
      if (timeoutId) clearTimeout(timeoutId);
      const data = await (result as Response).json();
      if (!(result as Response).ok) throw new Error(data.error || 'Unknown error');
      handleResult(data);
    } catch (error: any) {
      if (timeoutId) clearTimeout(timeoutId);
      alert(error.message.includes('Network request failed') ? 'Network error: Check if the backend server is running.' : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResult = (data: any) => {
    setResult(data);
    setModalVisible(true);
  };

  return (
    <PaperProvider theme={plantTheme}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Title style={styles.title}>Plant Disease Diagnosis</Title>
          {image ? (
            <Card style={styles.card}>
              <Card.Content style={{ alignItems: 'center' }}>
                <Image source={{ uri: image }} style={styles.image} />
                {!result ? (
                  <Button
                    mode="contained"
                    icon="leaf"
                    onPress={detectDisease}
                    loading={loading}
                    disabled={loading}
                    style={styles.detectButton}
                    labelStyle={{ fontWeight: '600', fontSize: 16 }}
                  >
                    Analyze Plant Health
                  </Button>
                ) : (
                  <Button
                    mode="contained"
                    icon="refresh"
                    onPress={() => {
                      setImage(null);
                      setResult(null);
                    }}
                    style={[styles.detectButton, styles.resetButton]}
                    labelStyle={{ fontWeight: '600', fontSize: 16 }}
                  >
                    Start New Diagnosis
                  </Button>
                )}
                {result && (
                  <Modal
                    visible={modalVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => {
                      setModalVisible(false);
                      setResult(null);
                    }}
                  >
                    <View style={styles.modalOverlay}>
                      <View style={styles.popupCard}>
                        <TouchableOpacity
                          style={styles.closeButton}
                          onPress={() => {
                            setModalVisible(false);
                            setResult(null);
                          }}
                          hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
                        >
                          <IconButton icon="close" size={24} iconColor="#15803D" />
                        </TouchableOpacity>
                        <Title style={styles.popupTitle}>{result?.disease_name || 'Result'}</Title>
                        <Paragraph style={styles.popupClass}>
                          Class: <Text style={{ fontWeight: 'bold' }}>{result?.class || '-'}</Text>
                        </Paragraph>
                        <Paragraph style={styles.confidenceText}>
                          Confidence Level: {result?.confidence ? (result.confidence * 100).toFixed(1) + '%' : '-'}
                        </Paragraph>
                        <Paragraph style={styles.detailTitle}>Recommended Action:</Paragraph>
                        <Paragraph style={styles.detailText}>{result?.advice || '-'}</Paragraph>
                        <Paragraph style={styles.detailTitle}>Symptoms Observed:</Paragraph>
                        <Paragraph style={styles.detailText}>{result?.symptoms || '-'}</Paragraph>
                        <Paragraph style={styles.detailTitle}>Possible Causes:</Paragraph>
                        <Paragraph style={styles.detailText}>{result?.causes || '-'}</Paragraph>
                        <Paragraph style={styles.detailTitle}>Prevention Tips:</Paragraph>
                        <Paragraph style={styles.detailText}>{result?.prevention || '-'}</Paragraph>
                        <Paragraph style={styles.detailTitle}>Treatment Suggestions:</Paragraph>
                        <Paragraph style={styles.detailText}>{result?.treatment || '-'}</Paragraph>
                      </View>
                    </View>
                  </Modal>
                )}
              </Card.Content>
            </Card>
          ) : (
            <>
              <View style={styles.placeholderContainer}>
                <Ionicons name="leaf-outline" size={80} color="#66BB6A" />
                <Text style={styles.placeholderText}>
                  Snap or select a plant photo to get instant health insights
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  mode="contained"
                  icon="camera"
                  onPress={takePhoto}
                  style={[styles.button, styles.cameraButton]}
                  labelStyle={{ fontWeight: '600', fontSize: 16 }}
                >
                  Take a Photo
                </Button>
                <Button
                  mode="contained"
                  icon="image"
                  onPress={pickImage}
                  style={[styles.button, styles.galleryButton]}
                  labelStyle={{ fontWeight: '600', fontSize: 16 }}
                >
                  Choose from Gallery
                </Button>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F0FDF4',
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#E6FCD9',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#6BCB77',
    textAlign: 'center',
    marginVertical: 24,
    letterSpacing: -0.5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    elevation: 8,
    width: 340,
    maxWidth: '100%',
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: 320,
    borderRadius: 16,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  detectButton: {
    borderRadius: 14,
    marginBottom: 16,
    marginTop: 8,
    backgroundColor: '#15803D',
  },
  resetButton: {
    backgroundColor: '#4F772D',
    marginTop: 0,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: 16,
    elevation: 4,
    paddingBottom: 8,
  },
  diseaseText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6BCB77',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  confidenceText: {
    fontSize: 17,
    color: '#8E8E93',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  detailsContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingTop: 20,
  },
  detailTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 16,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  detailText: {
    fontSize: 15,
    color: '#3C3C43',
    lineHeight: 22,
    letterSpacing: -0.2,
    opacity: 0.8,
  },
  placeholderContainer: {
    height: 320,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginVertical: 24,
    padding: 24,
    elevation: 4,
  },
  placeholderText: {
    fontSize: 17,
    color: '#1A1A1A',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 22,
    opacity: 0.8,
  },
  buttonContainer: {
    gap: 16,
    marginBottom: 24,
    width: '100%',
  },
  button: {
    borderRadius: 14,
    marginBottom: 8,
    elevation: 2,
  },
  cameraButton: {
    backgroundColor: '#6BCB77',
  },
  galleryButton: {
    backgroundColor: '#B5E61D',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupCard: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#7ED957',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
  },
  popupTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
    color: '#222',
  },
  popupClass: {
    fontSize: 16,
    marginBottom: 8,
    color: '#222',
  },
  popupDescription: {
    fontSize: 15,
    color: '#444',
    marginTop: 4,
  },
});
