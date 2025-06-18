// navigation/ProductStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderScreen from '../screens/OrderScreen';
import EditOrderScreen from '../screens/EditOrderScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
const Stack = createNativeStackNavigator();

export default function AreaStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="OrderMain" component={OrderScreen}/>
      <Stack.Screen name="EditOrder" component={EditOrderScreen}/>
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen}/>
    </Stack.Navigator>
  );
}
