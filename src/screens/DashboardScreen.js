import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/dashboard.style';
import { useNavigation /*,DrawerActions*/} from '@react-navigation/native';



//import { createDrawerNavigator } from '@react-navigation/drawer';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';


export default function DashboardScreen() {
  const navigation = useNavigation();

  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
        <View style={styles.header}>
        
       
          <Text style={styles.title}>
            Welcome to <Text style={{ color: '#075eec' }}>Dashboard</Text>
          </Text>
        
        </View>
      </View>
    </SafeAreaView>
  );
}
