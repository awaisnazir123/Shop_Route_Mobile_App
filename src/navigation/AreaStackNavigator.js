// navigation/ProductStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AreaScreen from '../screens/AreaScreen';
import AddAreaScreen from '../screens/AddAreaScreen';
import EditAreaScreen from '../screens/EditAreaScreen';
const Stack = createNativeStackNavigator();

export default function AreaStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AreaMain" component={AreaScreen}/>
      <Stack.Screen name="AddArea" component={AddAreaScreen}/>
      <Stack.Screen name="EditArea" component={EditAreaScreen}/>
    </Stack.Navigator>
  );
}
