import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './src/screens/SignInScreen';
import RegisterScreen from './src/screens/RegisterScreen'
//import DashboardScreen from './src/screens/DashboardScreen';
//import OrdersScreen from './src/screens/OrderScreen';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { MenuProvider } from 'react-native-popup-menu';
const Stack = createStackNavigator();

export default function App() {
  return (
     <MenuProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignInScreen"
        screenOptions={{ headerShown: false }}
      > 
        <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
        <Stack.Screen name="SignInScreen" component={SignInScreen}/>
        <Stack.Screen name="Main" component={DrawerNavigator} />   
      </Stack.Navigator>
    </NavigationContainer>
    </MenuProvider>
  );
}
