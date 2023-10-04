import { View, Text } from 'react-native';
import { styles } from './style';
import {
   requestForegroundPermissionsAsync,
   getCurrentPositionAsync,
   watchPositionAsync,
   LocationAccuracy
} from 'expo-location';
import MapView, {Marker} from 'react-native-maps';
import { useEffect, useState, useRef } from 'react';

export default function App() {

  const [location, setLocation] = useState(null);

  const mapRef = useRef(null);

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

  //atualiza localização e camera para acompanhar o pin
  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1
    },
    (response) => {
      setLocation(response);
      mapRef.current?.animateCamera({
        pitch:40,
        center: response.coords
      })
    }
    );
  },[]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Teste mapa no React native</Text>
      {
        location &&
        <MapView
          ref={mapRef}
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

