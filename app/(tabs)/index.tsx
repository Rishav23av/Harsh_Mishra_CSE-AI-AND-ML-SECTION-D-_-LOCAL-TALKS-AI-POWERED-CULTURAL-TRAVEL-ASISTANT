import { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, FlatList, Text, ActivityIndicator } from 'react-native';
import { Search, MapPin } from 'lucide-react-native';
import PlaceCard, { Place } from '@/components/PlaceCard';

// This would typically come from an API
const ALL_PLACES: Place[] = [
  {
    id: '1',
    name: 'Eiffel Tower',
    location: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400',
    description: 'Iconic iron lattice tower on the Champ de Mars in Paris, France. One of the most famous landmarks in the world.',
  },
  {
    id: '2',
    name: 'Colosseum',
    location: 'Rome, Italy',
    image: 'https://images.unsplash.com/photo-1552432552-06c0b0a94dda?w=400',
    description: 'Ancient amphitheater in the center of Rome. The largest ancient amphitheater ever built.',
  },
  {
    id: '3',
    name: 'Taj Mahal',
    location: 'Agra, India',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400',
    description: 'An ivory-white marble mausoleum on the right bank of the river Yamuna. A symbol of eternal love.',
  },
  {
    id: '4',
    name: 'Machu Picchu',
    location: 'Cusco Region, Peru',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400',
    description: 'Ancient Incan city set high in the Andes Mountains. A marvel of engineering and architecture.',
  },
  {
    id: '5',
    name: 'Santorini',
    location: 'Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400',
    description: 'Beautiful island in the Aegean Sea, known for its white-washed buildings and stunning sunsets.',
  },
];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>(ALL_PLACES);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const searchPlaces = () => {
      setIsSearching(true);
      const query = searchQuery.toLowerCase();
      
      const results = ALL_PLACES.filter(place => 
        place.name.toLowerCase().includes(query) ||
        place.location.toLowerCase().includes(query) ||
        place.description.toLowerCase().includes(query)
      );
      
      setFilteredPlaces(results);
      setIsSearching(false);
    };

    // Add a small delay to avoid too many updates while typing
    const timeoutId = setTimeout(searchPlaces, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore Places</Text>
        <Text style={styles.subtitle}>Discover amazing destinations around the world</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#8E8E93" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search places..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {isSearching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : filteredPlaces.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <MapPin size={48} color="#8E8E93" />
          <Text style={styles.noResultsText}>No places found</Text>
          <Text style={styles.noResultsSubtext}>Try a different search term</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPlaces}
          renderItem={({ item }) => <PlaceCard place={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#636366',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1E',
  },
  listContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 16,
    color: '#8E8E93',
  },
});