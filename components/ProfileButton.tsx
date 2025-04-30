import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileButton() {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push('/profile')}
    >
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100' }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  image: {
    width: 40,
    height: 40,
  },
});