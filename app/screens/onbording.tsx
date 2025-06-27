import { DefaultTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Animated, Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

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

const OnboardingScreen = () => {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(30);
  const scaleAnim = new Animated.Value(0.95);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    router.replace('/screens/(tabs)');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={styles.container}>
        {/* Background decorative elements */}
        <View style={styles.backgroundCircle1} />
        <View style={styles.backgroundCircle2} />
        
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ],
            },
          ]}
        >
          {/* Content Section */}
          <View style={styles.textSection}>
            <View style={styles.badgeContainer}>
              <Text style={styles.badge}>🌿 Plant Health AI</Text>
            </View>
            
            <Text style={styles.title}>
              Welcome to{'\n'}
              <Text style={styles.titleAccent}>PestiCare</Text>
            </Text>
            
            <Text style={styles.description}>
              Advanced plant disease detection powered by AI. Get instant diagnosis and personalized treatment recommendations for healthier plants.
            </Text>

            {/* Feature highlights */}
            <View style={styles.featuresContainer}>
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureEmoji}>📱</Text>
                </View>
                <Text style={styles.featureText}>Instant Detection</Text>
              </View>
              
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureEmoji}>🔬</Text>
                </View>
                <Text style={styles.featureText}>AI-Powered Analysis</Text>
              </View>
              
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureEmoji}>💡</Text>
                </View>
                <Text style={styles.featureText}>Expert Advice</Text>
              </View>
            </View>
          </View>

          {/* CTA Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleGetStarted}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#6BCB77', '#B5E61D']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.buttonText}>Continue</Text>
                <Text style={styles.buttonArrow}>→</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <Text style={styles.termsText}>
              By continuing, you agree to our Terms of Service
            </Text>
          </View>
        </Animated.View>
      </View>
    </>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6FCD9',
    paddingTop: StatusBar.currentHeight || 44,
  },
  backgroundCircle1: {
    position: 'absolute',
    top: -100,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
  },
  backgroundCircle2: {
    position: 'absolute',
    bottom: -80,
    left: -60,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(34, 197, 94, 0.03)',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  textSection: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
    marginTop: height * 0.1,
  },
  badgeContainer: {
    backgroundColor: 'rgba(107, 203, 119, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
  },
  badge: {
    fontSize: 14,
    fontWeight: '600',
    color: '#15803D',
    textAlign: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    textAlign: 'center',
    color: '#0F172A',
    marginBottom: 16,
    lineHeight: 42,
    letterSpacing: -0.5,
  },
  titleAccent: {
    color: '#6BCB77',
    fontWeight: '800',
  },
  description: {
    fontSize: 17,
    lineHeight: 26,
    textAlign: 'center',
    color: '#64748B',
    marginBottom: 32,
    paddingHorizontal: 8,
    letterSpacing: -0.2,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  featureEmoji: {
    fontSize: 20,
  },
  featureText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#475569',
    textAlign: 'center',
    lineHeight: 16,
  },
  buttonContainer: {
    paddingBottom: 20,
  },
  primaryButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#6BCB77',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    backgroundColor: '#6BCB77',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.2,
    marginRight: 8,
  },
  buttonArrow: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '400',
  },
  termsText: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 32,
  },
});