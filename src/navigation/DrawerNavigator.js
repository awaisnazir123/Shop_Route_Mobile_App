import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screens/DashboardScreen';
//import ProductsScreen from '../screens/ProductsScreen';
import OrdersScreen from '../screens/OrderScreen';
import AddCityScreen from '../screens/AddCityScreen';
import AddAreaScreen from '../screens/AddAreaScreen';
import ShopsScreen from '../screens/ShopsScreen';
import OrdersHistoryScreen from '../screens/OrderHistoryScreen';
import ProductStackNavigator from './ProductStackNavigator';
import CustomDrawer from '../components/CustomDrawer'; 

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />} 
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Products" component={ProductStackNavigator} />
      {/*<Drawer.Screen name="Products" component={ProductsScreen} />*/}
      <Drawer.Screen name="Orders" component={OrdersScreen} />
      <Drawer.Screen name="Add City" component={AddCityScreen} />
      <Drawer.Screen name="Add Area" component={AddAreaScreen} />
      <Drawer.Screen name="Shops" component={ShopsScreen} />
      <Drawer.Screen name="Orders History" component={OrdersHistoryScreen} />
    </Drawer.Navigator>
  );
}
