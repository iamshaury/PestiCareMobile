import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="screens/onbording" options={{ headerShown: false }} />
      <Stack.Screen name="screens/(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
