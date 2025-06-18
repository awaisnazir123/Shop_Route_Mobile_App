import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ProductStackNavigator from './ProductStackNavigator';
import CityStackNavigator from './CityStackNavigator';
import AreaStackNavigator from './AreaStackNavigator';
import ShopStackNavigator from './ShopStackNavigator';
import CustomDrawer from '../components/CustomDrawer'; 
import DashboardScreen from '../screens/DashboardScreen';
import ProductSelectionNavigator from './ProductSelectionNavigator';
import OrderStackNavigator from './OrderStackNavigator';
import UserStackNavigator from './UserStackNavigator';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const [role, setRole] = useState(null);
  const [isAccess, setIsAccess] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const storedRole = await AsyncStorage.getItem('role');
      const storedAccess = await AsyncStorage.getItem('access');
      setRole(storedRole);
      setIsAccess(storedAccess === 'true'); // convert to boolean
    };
    fetchUserRole();
  }, []);

  if (role === null || isAccess === null) {
    return null; // or loading screen
  }

  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      {role === 'admin' && (
        <>
          <Drawer.Screen name="Dashboard" component={DashboardScreen} />
          <Drawer.Screen name="Products" component={ProductStackNavigator} />
          <Drawer.Screen name="City" component={CityStackNavigator} />
          <Drawer.Screen name="Area" component={AreaStackNavigator} />
          <Drawer.Screen name="Shop" component={ShopStackNavigator} />
          <Drawer.Screen name="ProductSelectionScreen" component={ProductSelectionNavigator }  options={{ drawerItemStyle: { display: 'none' } }}/>
          <Drawer.Screen name="Orders" component={OrderStackNavigator} />
          <Drawer.Screen name="User" component={UserStackNavigator} />
        </>
      )}

      {role === 'salesman' && isAccess === true && (
        <>
         <Drawer.Screen name="Dashboard" component={DashboardScreen} />
          <Drawer.Screen name="City" component={CityStackNavigator} />
          <Drawer.Screen name="Area" component={AreaStackNavigator} />
          <Drawer.Screen name="Shop" component={ShopStackNavigator} />
          <Drawer.Screen name="ProductSelectionScreen" component={ProductSelectionNavigator }  options={{ drawerItemStyle: { display: 'none' } }}/>
          <Drawer.Screen name="Orders History" component={OrderHistoryScreen} />
        </>
      )}

      {role === 'salesman' && isAccess === false && (
        <>
          <Drawer.Screen name="Dashboard" component={DashboardScreen} />
          <Drawer.Screen name="Orders History" component={OrderHistoryScreen} />
        </>
      )}
    </Drawer.Navigator>
  );
}
