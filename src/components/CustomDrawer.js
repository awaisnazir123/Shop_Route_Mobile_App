import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function CustomDrawer(props) {
  const navigation = useNavigation();

  const handleLogout = async () => {
      try {
        await AsyncStorage.removeItem('userToken');
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        });
      } catch (error) {
        Alert.alert('Error', 'An error occurred during logout.');
        console.error('Logout error:', error);
      }
    };

  return (
    <View style={{ flex: 1 }}>
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 40 }}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>

    {/* Logout Button */}
    <View style={styles.logoutContainer}>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
 logoutContainer: {
    marginBottom: 40,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    backgroundColor: '#075eec',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
