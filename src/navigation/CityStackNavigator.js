// navigation/ProductStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CityScreen from '../screens/CityScreen';
import AddCityScreen from '../screens/AddCityScreen';
import EditCityScreen from '../screens/EditCityScreen';
const Stack = createNativeStackNavigator();

export default function CityStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CityMain" component={CityScreen} options={{ title: 'Cities' }} />
      <Stack.Screen name="AddCity" component={AddCityScreen} />
      <Stack.Screen name="EditCity" component={EditCityScreen} /> 
    </Stack.Navigator>
  );
}
