import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { MapPin, IndianRupee, Utensils, ArrowLeft, Mail, Phone, Globe } from 'lucide-react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200' }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>Rishav Kumar</Text>
          <Text style={styles.location}>New Delhi, India</Text>
          
          <View style={styles.basicInfo}>
            <View style={styles.infoItem}>
              <Mail size={20} color="#666" />
              <Text style={styles.infoText}>rishav12av@gmail.com</Text>
            </View>
            <View style={styles.infoItem}>
              <Phone size={20} color="#666" />
              <Text style={styles.infoText}>+91 98765 43210</Text>
            </View>
            <View style={styles.infoItem}>
              <Globe size={20} color="#666" />
              <Text style={styles.infoText}>Speaks: English, Hindi</Text>
            </View>
          </View>

          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>Places Visited</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Countries</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin size={24} color="#007AFF" />
            <Text style={styles.sectionTitle}>Places Visited</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {visitedPlaces.map(place => (
              <View key={place.id} style={styles.placeCard}>
                <Image source={{ uri: place.image }} style={styles.placeImage} />
                <Text style={styles.placeName}>{place.name}</Text>
                <Text style={styles.placeDate}>{place.date}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IndianRupee size={24} color="#007AFF" />
            <Text style={styles.sectionTitle}>Travel Expenses</Text>
          </View>
          <View style={styles.expensesList}>
            {expenses.map(expense => (
              <View key={expense.id} style={styles.expenseItem}>
                <Text style={styles.expenseCategory}>{expense.category}</Text>
                <Text style={styles.expenseAmount}>₹{expense.amount}</Text>
              </View>
            ))}
            <View style={styles.totalExpense}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalAmount}>
                ₹{expenses.reduce((sum, expense) => sum + expense.amount, 0)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Utensils size={24} color="#007AFF" />
            <Text style={styles.sectionTitle}>Favorite Foods</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {favoriteFoods.map(food => (
              <View key={food.id} style={styles.foodCard}>
                <Image source={{ uri: food.image }} style={styles.foodImage} />
                <Text style={styles.foodName}>{food.name}</Text>
                <Text style={styles.foodLocation}>{food.location}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const visitedPlaces = [
  {
    id: '1',
    name: 'Eiffel Tower',
    date: '2024-02-15',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=200',
  },
  {
    id: '2',
    name: 'Colosseum',
    date: '2024-02-10',
    image: 'https://images.unsplash.com/photo-1552432552-06c0b0a94dda?w=200',
  },
];

const expenses = [
  { id: '1', category: 'Accommodation', amount: 15000 },
  { id: '2', category: 'Food', amount: 1200 },
  { id: '3', category: 'Transportation', amount: 60000 },
];

const favoriteFoods = [
  {
    id: '1',
    name: 'Croissant',
    location: 'Paris',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200',
  },
  {
    id: '2',
    name: 'Pizza Napoletana',
    location: 'Naples',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=200',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  basicInfo: {
    width: '100%',
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#666',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 8,
  },
  horizontalScroll: {
    flexGrow: 0,
  },
  placeCard: {
    width: 160,
    marginRight: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    overflow: 'hidden',
  },
  placeImage: {
    width: '100%',
    height: 120,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '600',
    padding: 8,
  },
  placeDate: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  expensesList: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  expenseCategory: {
    fontSize: 16,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalExpense: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    marginTop: 8,
    borderTopWidth: 2,
    borderTopColor: '#007AFF',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  foodCard: {
    width: 160,
    marginRight: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    overflow: 'hidden',
  },
  foodImage: {
    width: '100%',
    height: 120,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    padding: 8,
  },
  foodLocation: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
});

export default ProfileScreen;