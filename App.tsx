import { useState, useEffect } from 'react'
import { View } from 'react-native';
import { styles } from './styles';
import MapView from 'react-native-maps';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject
} from 'expo-location';


export default function App() {

  const [location, setLocation] = useState<LocationObject | null>(null)

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition)
    }
  }

  useEffect(() => {
    requestLocationPermissions();
  }, [])

  return (
    <View style={styles.container}>
      {
        location &&
      <MapView
      style={styles.map} 
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }} 
      />
    }
    </View>
  );
}
