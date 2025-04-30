import { useState } from 'react';
import { StyleSheet, View, TextInput, FlatList, Text, Image, Pressable, ScrollView } from 'react-native';
import { Search, Clock, Brain as Train, Plane, Bus, Utensils } from 'lucide-react-native';

const POPULAR_PLACES = [
  {
    id: '1',
    name: 'Tokyo Tower',
    location: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=400',
    description: 'Communications and observation tower in the Shiba-koen district of Minato, Tokyo.',
    rating: 4.8,
    reviews: 12500,
    travelInfo: {
      bestTime: 'March-May (Spring)',
      duration: '2-3 days recommended',
      transportation: ['Train', 'Bus', 'Taxi'],
      travelTime: {
        fromAirport: '45 mins by train',
        fromCityCenter: '20 mins by metro'
      }
    },
    popularFood: [
      {
        name: 'Sushi',
        description: 'Fresh local sushi from nearby Tsukiji market',
        price: '¥1000-3000',
        image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        name: 'Ramen',
        description: 'Traditional Tokyo-style ramen',
        price: '¥800-1500',
        image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ]
  },
  {
    id: '2',
    name: 'Eiffel Tower',
    location: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400',
    description: 'Iconic wrought-iron lattice tower on the Champ de Mars in Paris.',
    rating: 4.7,
    reviews: 15000,
    travelInfo: {
      bestTime: 'June-September',
      duration: '2-3 hours',
      transportation: ['Metro', 'Bus', 'Walking'],
      travelTime: {
        fromAirport: '1 hour by RER',
        fromCityCenter: '15 mins by metro'
      }
    },
    popularFood: [
      {
        name: 'Croissants',
        description: 'Fresh-baked French croissants',
        price: '€2-4',
        image: 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        name: 'Macarons',
        description: 'Colorful French macarons',
        price: '€15-20 (box)',
        image: 'https://images.pexels.com/photos/3776947/pexels-photo-3776947.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ]
  },
  // ... other places with similar structure
];

export default function PlacesScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const renderPlace = ({ item }) => (
    <Pressable style={styles.placeCard}>
      <Image source={{ uri: item.image }} style={styles.placeImage} />
      <View style={styles.placeInfo}>
        <View style={styles.placeHeader}>
          <Text style={styles.placeName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewCount}>({item.reviews.toLocaleString()} reviews)</Text>
          </View>
        </View>
        <Text style={styles.placeLocation}>{item.location}</Text>
        <Text style={styles.placeDescription} numberOfLines={3}>
          {item.description}
        </Text>

        <View style={styles.travelInfoSection}>
          <Text style={styles.sectionTitle}>Travel Information</Text>
          
          <View style={styles.travelDetail}>
            <Clock size={16} color="#666" />
            <Text style={styles.travelText}>Best Time: {item.travelInfo.bestTime}</Text>
          </View>
          
          <View style={styles.travelDetail}>
            <Clock size={16} color="#666" />
            <Text style={styles.travelText}>Duration: {item.travelInfo.duration}</Text>
          </View>

          <View style={styles.transportationContainer}>
            <Text style={styles.transportTitle}>Getting There:</Text>
            <View style={styles.transportIcons}>
              {item.travelInfo.transportation.includes('Train') && (
                <Train size={20} color="#007AFF" style={styles.transportIcon} />
              )}
              {item.travelInfo.transportation.includes('Bus') && (
                <Bus size={20} color="#007AFF" style={styles.transportIcon} />
              )}
              {item.travelInfo.transportation.includes('Metro') && (
                <Train size={20} color="#007AFF" style={styles.transportIcon} />
              )}
            </View>
          </View>

          <View style={styles.travelTimes}>
            <Text style={styles.travelTimeText}>
              From Airport: {item.travelInfo.travelTime.fromAirport}
            </Text>
            <Text style={styles.travelTimeText}>
              From City Center: {item.travelInfo.travelTime.fromCityCenter}
            </Text>
          </View>
        </View>

        <View style={styles.foodSection}>
          <View style={styles.sectionHeader}>
            <Utensils size={20} color="#007AFF" />
            <Text style={styles.sectionTitle}>Popular Local Food</Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.foodScroll}
          >
            {item.popularFood.map((food, index) => (
              <View key={index} style={styles.foodCard}>
                <Image source={{ uri: food.image }} style={styles.foodImage} />
                <View style={styles.foodInfo}>
                  <Text style={styles.foodName}>{food.name}</Text>
                  <Text style={styles.foodDescription}>{food.description}</Text>
                  <Text style={styles.foodPrice}>{food.price}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Popular Places</Text>
        <Text style={styles.subtitle}>Discover the world's most iconic destinations</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <Search size={20} color="#8E8E93" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search destinations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={POPULAR_PLACES}
        renderItem={renderPlace}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  placeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
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
  placeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  placeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C1E',
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#8E8E93',
  },
  placeLocation: {
    fontSize: 16,
    color: '#636366',
    marginBottom: 8,
  },
  placeDescription: {
    fontSize: 14,
    color: '#636366',
    lineHeight: 20,
    marginBottom: 16,
  },
  travelInfoSection: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingTop: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  travelDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  travelText: {
    fontSize: 14,
    color: '#636366',
    marginLeft: 8,
  },
  transportationContainer: {
    marginTop: 12,
  },
  transportTitle: {
    fontSize: 14,
    color: '#636366',
    marginBottom: 8,
  },
  transportIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transportIcon: {
    marginRight: 12,
  },
  travelTimes: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
  },
  travelTimeText: {
    fontSize: 14,
    color: '#636366',
    marginBottom: 4,
  },
  foodSection: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  foodScroll: {
    marginTop: 8,
  },
  foodCard: {
    width: 200,
    marginRight: 12,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    overflow: 'hidden',
  },
  foodImage: {
    width: '100%',
    height: 120,
  },
  foodInfo: {
    padding: 12,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  foodDescription: {
    fontSize: 12,
    color: '#636366',
    marginBottom: 4,
  },
  foodPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
  },
});