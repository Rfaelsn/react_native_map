import { View, Text } from 'react-native';
import { styles } from './style';
import {
   requestForegroundPermissionsAsync,
   getCurrentPositionAsync,
   watchPositionAsync,
   LocationAccuracy
} from 'expo-location';
import MapView, {Marker} from 'react-native-maps';
import { useEffect, useState } from 'react';

export default function App() {

  const [location, setLocation] = useState(null);

  async function requestLocationPermissions(){
    const { granted } = await requestForegroundPermissionsAsync();

    if(granted){
      const currentPosition = await getCurrentPositionAsync();  
      setLocation(currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermissions();
  },[]);

  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1
    },
    (response) => {
      console.log("Nova localização");
      setLocation(response);
    }
    );
  },[]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Teste mapa no React native</Text>
      {
        location &&
        <MapView
          style={styles.map}
          initialRegion={
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }
          }
        >
          <Marker
            coordinate={
              {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }
            }
          />
        </MapView>
      }
    </View>
  );
}

