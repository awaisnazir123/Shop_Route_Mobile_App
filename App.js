import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './src/screens/SignInScreen';

//import RegisterScreen from './src/screens/RegisterScreen'
import DashboardScreen from './src/screens/DashboardScreen';
//import OrdersScreen from './src/screens/OrderScreen';
import DrawerNavigator from './src/navigation/DrawerNavigator';
const Stack = createStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{ headerShown: false }}
      >
       {/* <Stack.Screen name="Register" component={RegisterScreen}/> */} 
        <Stack.Screen name="SignIn" component={SignInScreen}/>
         <Stack.Screen name="Main" component={DrawerNavigator} />  
       {/* <Stack.Screen name="DashboardScreen" component={DashboardScreen}/> */}
        
       {/* <Stack.Screen name="OrderScreen" component={OrdersScreen}/> */}
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
