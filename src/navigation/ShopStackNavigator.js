// navigation/ProductStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShopScreen from '../screens/ShopScreen';
import AddShopScreen from '../screens/AddShopScreen';
import EditShopScreen from '../screens/EditShopScreen';
const Stack = createNativeStackNavigator();

export default function ShopStackNavigator() {
  return (
    <Stack.Navigator>
    <Stack.Screen name="ShopMain" component={ShopScreen} options={{ title: 'Shops' }} />
    <Stack.Screen name="AddShop" component={AddShopScreen} options={{ title: 'Add Shops' }} />
    <Stack.Screen name="EditShop" component={EditShopScreen} options={{ title: 'Edit Shops' }} />
    </Stack.Navigator>
  );
}
