import { View } from 'react-native';
import { styles } from './style';
import {
   requestForegroundPermissionsAsync,
   getCurrentPositionAsync,
} from 'expo-location';
import { useEffect, useState } from 'react';

export default function App() {

  const [location, setLocation] = useState(null);

  async function requestLocationPermissions(){
    const { granted } = await requestForegroundPermissionsAsync();

    if(granted){
      const currentPosition = await getCurrentPositionAsync();  
      setLocation(currentPosition);
      console.log("Localização: ",currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermissions();
  },[]);

  return (
    <View style={styles.container}>
      
    </View>
  );
}

