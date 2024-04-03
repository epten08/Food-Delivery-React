import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import * as Location from 'expo-location';
import BottomTab from './app/navigation/BottomTab';
import { UserReversedGeoCodeContext } from "./app/context/UserReversedGeoCode"
import { UserLocationContext } from './app/context/UserLocationContext';

const Stack = createNativeStackNavigator();

export default function App() {

  const [location, setLocation] = useState(null);
  const [address, setAdress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const defaultAddresss = { "city": "Shanghai", "country": "China", "district": "Pudong", "isoCountryCode": "CN", "name": "33 East Nanjing Rd", "postalCode": "94108", "region": "SH", "street": "Stockton St", "streetNumber": "1", "subregion": "San Francisco County", "timezone": "America/Los_Angeles" }
  const [fontsLoaded] = useFonts({
    regular: require('./assets/fonts/Poppins-Regular.ttf'),
    light: require('./assets/fonts/Poppins-Light.ttf'),
    bold: require('./assets/fonts/Poppins-Bold.ttf'),
    medium: require('./assets/fonts/Poppins-Medium.ttf'),
    extrabold: require('./assets/fonts/Poppins-ExtraBold.ttf'),
    semibold: require('./assets/fonts/Poppins-SemiBold.ttf'),
  });


  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    {
      async () => {
        setAdress(defaultAddresss);

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access locaion is denied')
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }
    } { };

  }, [])

  if (!fontsLoaded) {
    // Return a loading indicator or splash screen while fonts are loading or app is initializing
    return;
  }

  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <UserReversedGeoCodeContext.Provider value={{ address, setAdress }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name='bottom-navigation'
              component={BottomTab}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserReversedGeoCodeContext.Provider>
    </UserLocationContext.Provider>
  );
}
