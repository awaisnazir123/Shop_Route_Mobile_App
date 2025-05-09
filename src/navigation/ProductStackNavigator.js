// navigation/ProductStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductsScreen from '../screens/ProductsScreen';
import AddProductScreen from '../screens/AddProductScreen';
import EditProductScreen from '../screens/EditProductScreen';
const Stack = createNativeStackNavigator();

export default function ProductStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductsMain" component={ProductsScreen} options={{ title: 'Products' }} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
      <Stack.Screen name="EditProduct" component={EditProductScreen} /> 
    </Stack.Navigator>
  );
}
