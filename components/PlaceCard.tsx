import { StyleSheet, View, Text, Image, Pressable } from 'react-native';

export interface Place {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
}

interface PlaceCardProps {
  place: Place;
  onPress?: () => void;
}

export default function PlaceCard({ place, onPress }: PlaceCardProps) {
  return (
    <Pressable style={styles.placeCard} onPress={onPress}>
      <Image source={{ uri: place.image }} style={styles.placeImage} />
      <View style={styles.placeInfo}>
        <Text style={styles.placeName}>{place.name}</Text>
        <Text style={styles.placeLocation}>{place.location}</Text>
        <Text style={styles.placeDescription} numberOfLines={2}>
          {place.description}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  placeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  placeImage: {
    width: '100%',
    height: 200,
  },
  placeInfo: {
    padding: 16,
  },
  placeName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  placeLocation: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  placeDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});