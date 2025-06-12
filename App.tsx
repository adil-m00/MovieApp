// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/Homescreen';
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import MainNavigator from './src/navigation/MainNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  return (
    <SafeAreaProvider>
       <NavigationContainer> 
          <MainNavigator />

          </NavigationContainer>
    </SafeAreaProvider>
  );
}
