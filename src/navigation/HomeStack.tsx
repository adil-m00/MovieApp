import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';    
import HomeScreen from '../screens/HomeScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}> 
    <Stack.Screen name="HomeScreen" component={HomeScreen} />   
    <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />     
  </Stack.Navigator>
);

export default HomeStack;
