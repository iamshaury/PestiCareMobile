import Feather from '@expo/vector-icons/Feather';
import * as Font from 'expo-font';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

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

// Load custom fonts
const useCustomFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const loadFonts = () => Font.loadAsync({
    'Montserrat-Regular': require('../../../assets/fonts/italic.ttf'),
    'Montserrat-Bold': require('../../../assets/fonts/variable.ttf'),
  });
  return { fontsLoaded, setFontsLoaded, loadFonts };
};

const PlantCareApp = () => {
  const router = useRouter();
  const { fontsLoaded, setFontsLoaded, loadFonts } = useCustomFonts();

  if (!fontsLoaded) {
    loadFonts().then(() => setFontsLoaded(true));
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E6FCD9' }}>
        <Text style={{ fontSize: 18, color: '#6BCB77' }}>Loading...</Text>
      </View>
    );
  }

  const scanPlant = () => {
    router.push('/screens/(tabs)/detect');
  };

  type FeatherIconName = keyof typeof Feather.glyphMap;
  const QuickActionButton = ({ icon, label, onPress }: { icon?: FeatherIconName; label: string; onPress: () => void }) => (
    <Button
      mode="contained"
      icon={() => <Feather name={icon && Feather.glyphMap[icon] ? icon : 'camera'} size={24} color="white" />}
      onPress={onPress}
      style={styles.actionBtn}
      labelStyle={{ fontWeight: '600', fontSize: 16 }}
      contentStyle={{ flexDirection: 'row-reverse' }}
    >
      {label}
    </Button>
  );

  const PlantIdentifierCard = ({ image, title, subtitle }: { image: any; title: string; subtitle: string }) => (
    <View style={styles.identifierCard}>
      <Image source={image} style={styles.identifierImage} />
      <Text style={styles.identifierTitle}>{title}</Text>
      <Text style={styles.identifierSubtitle}>{subtitle}</Text>
    </View>
  );

  return (
    <PaperProvider theme={plantTheme}>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={require('../../../assets/images/banner.png')} style={styles.banner} />
          <View style={styles.content}>
            <View style={styles.section}>
              <View style={styles.quickActions}>
                <QuickActionButton label="Scan Plant" onPress={scanPlant} />
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Available Plant Identifiers</Text>
              <View style={styles.identifierGrid}>
                <PlantIdentifierCard
                  image={require('../../../assets/images/tomato.png')}
                  title="Tomato Leaf"
                  subtitle="Identifier"
                />
                <PlantIdentifierCard
                  image={require('../../../assets/images/potato.png')}
                  title="Potato Leaf"
                  subtitle="Identifier"
                />
                <PlantIdentifierCard
                  image={require('../../../assets/images/bellpaper.png')}
                  title="Bell Pepper Leaf"
                  subtitle="Identifier"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6FCD9',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '400',
    textAlign: 'center',
  },
  content: {
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    
    marginBottom: 16,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#1A1A1A',
    fontFamily: 'variable',
    
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    borderRadius: 16,
    marginHorizontal: 4,
    marginBottom: 8,
    backgroundColor: '#6BCB77',
    elevation: 2,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    elevation: 4,
  },
  tipTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#222',
    fontFamily: 'variable',
  },
  tipDescription: {
    fontSize: 14,
    color: '#4B6B50',
    lineHeight: 20,
    fontFamily: 'italic',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    width: '100%',
    height: 160,
    borderRadius: 20,
    marginBottom: 24,
    resizeMode: 'cover',
    marginTop: 40,
  },
  identifierGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 24,
  },
  identifierCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    padding: 14,
    marginHorizontal: 4,
    marginBottom: 16,
    elevation: 2,
    flexBasis: '44%',
    flexGrow: 0,
    flexShrink: 0,
  },
  identifierImage: {
    width: 70,
    height: 70,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  identifierTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
    textAlign: 'center',
    fontFamily: 'variable',
  },
  identifierSubtitle: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    fontFamily: 'italic',
  },
});

export default PlantCareApp;