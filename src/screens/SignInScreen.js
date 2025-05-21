import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import SignInForm from '../components/SignInForm'; 
import { styles } from '../styles/register.style'; 
import { globalbtnstyle } from '../styles/global.style';
export default function SignInScreen() {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        //navigation.navigate('DashboardScreen');
        navigation.navigate('Main');
      }
    };

    checkToken();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Sign in to <Text style={{ color: '#075eec' }}>Shoproute</Text></Text>
          
        </View>

        
        <SignInForm form={form} setForm={setForm} />

      </View>
      <View style={globalbtnstyle.Container}>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')} style={globalbtnstyle.Button}>
              <Text style={globalbtnstyle.Text}>Create an account</Text>
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  );
}
