import { Tabs } from 'expo-router';
import { Globe as Globe2, MapPin, Navigation } from 'lucide-react-native';
import ProfileButton from '@/components/ProfileButton';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerLeft: () => <ProfileButton />,
        headerShown: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'home',
          tabBarIcon: ({ color, size }) => <MapPin size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="places"
        options={{
          title: 'Popular Places',
          tabBarIcon: ({ color, size }) => <Navigation size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="translate"
        options={{
          title: 'Translate',
          tabBarIcon: ({ color, size }) => <Globe2 size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}