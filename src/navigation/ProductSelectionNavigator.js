// navigation/ProductStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductSelectionScreen from '../screens/ProductSelectionScreen';
import DashboardScreen from '../screens/DashboardScreen';
const Stack = createNativeStackNavigator();

export default function ProductSelectionNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductSelection" component={ProductSelectionScreen} />
      <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
    </Stack.Navigator>
  );
}
