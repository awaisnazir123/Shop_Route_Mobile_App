// navigation/ProductStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserScreen from '../screens/UserScreen';
import EditUserScreen from '../screens/EditUserScreen';
const Stack = createNativeStackNavigator();

export default function UserStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserMain" component={UserScreen}/>
       <Stack.Screen name="EditUser" component={EditUserScreen}/>
    </Stack.Navigator>
  );
}
