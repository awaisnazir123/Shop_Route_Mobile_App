import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screens/DashboardScreen';
//import ProductsScreen from '../screens/ProductsScreen';
import OrdersScreen from '../screens/OrderScreen';
//import CityScreen from '../screens/CityScreen';
//import AddAreaScreen from '../screens/AddAreaScreen';
import OrdersHistoryScreen from '../screens/OrderHistoryScreen';
import ProductStackNavigator from './ProductStackNavigator';
import CityStackNavigator from './CityStackNavigator';
import AreaStackNavigator from './AreaStackNavigator';
import ShopStackNavigator from './ShopStackNavigator';
import CustomDrawer from '../components/CustomDrawer'; 
//import AreasScreen from '../screens/AreaScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />} 
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Products" component={ProductStackNavigator} />
      <Drawer.Screen name="City" component={CityStackNavigator} />
      <Drawer.Screen name="Area" component={AreaStackNavigator}/>
      <Drawer.Screen name="Shop" component={ShopStackNavigator} />
      <Drawer.Screen name="Orders" component={OrdersScreen} />
      <Drawer.Screen name="Orders History" component={OrdersHistoryScreen} />
    </Drawer.Navigator>
  );
}
