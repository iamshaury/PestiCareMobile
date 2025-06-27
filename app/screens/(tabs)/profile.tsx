import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, DefaultTheme, Provider as PaperProvider, Paragraph, Title } from 'react-native-paper';

const plantTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6BCB77', // vibrant green from banner
    accent: '#B5E61D',  // light accent green
    background: '#E6FCD9', // light green background from banner
    surface: '#FFFFFF',
    text: '#222',
  },
};

export default function Profile() {
  // Mock user data
  const user = {
    name: 'Jane Doe',
    email: 'jane.doe@email.com',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=15803D&color=fff&size=128',
  };

  return (
    <PaperProvider theme={plantTheme}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content style={{ alignItems: 'center' }}>
            <Avatar.Image
              size={96}
              source={{ uri: user.avatar }}
              style={{ backgroundColor: '#E6F4EA' }}
            />
            <Title style={styles.name}>{user.name}</Title>
            <Paragraph style={styles.email}>{user.email}</Paragraph>
            <Button mode="contained" style={styles.editBtn} onPress={() => {}}>
              Edit Profile
            </Button>
          </Card.Content>
        </Card>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6FCD9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: 320,
    maxWidth: '100%',
    elevation: 8,
  },
  name: {
    marginTop: 16,
    fontWeight: '700',
    color: '#6BCB77',
  },
  email: {
    color: '#64748B',
    marginBottom: 24,
  },
  editBtn: {
    borderRadius: 12,
    marginTop: 8,
    backgroundColor: '#6BCB77',
  },
});