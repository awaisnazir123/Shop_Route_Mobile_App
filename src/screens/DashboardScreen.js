//import React from 'react';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/dashboard.style';
import { useNavigation /*,DrawerActions*/} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


//import { createDrawerNavigator } from '@react-navigation/drawer';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';


export default function DashboardScreen() {
   
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error('Error getting username', error);
      }
    };

    fetchUsername();
    
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
        <View style={styles.header}>
        
       
          <Text style={styles.title}>
            Welcome {username ? username : 'to Dashboard'}
          </Text>
        
        </View>
      </View>
    </SafeAreaView>
  );
}
