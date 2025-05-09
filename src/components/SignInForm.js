import React from 'react';
import { Alert,Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/signIn.style'; // Importing styles

export default function SignInForm({ form, setForm }) {
  const navigation = useNavigation();
  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.0.194:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        //Alert.alert('Login Successful', `Token: ${data.token}`);
        await AsyncStorage.setItem('userToken', data.token);
        //navigation.navigate('DashboardScreen');
        navigation.navigate('Main');
        // You can store the token using AsyncStorage or navigate to another screen
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login');
      console.error('Login error:', error);
    }
    

  };

  return (
    <View style={styles.form}>
      {/* User Name Input */}
      <View style={styles.input}>
        <Text style={styles.inputLabel}>User Name</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={(username) => setForm({ ...form, username })}
          placeholder="abc123"
          placeholderTextColor="#6b7280"
          style={styles.inputControl}
          value={form.username}
        />
      </View>

      {/* Password Input */}
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          autoCorrect={false}
          onChangeText={(password) => setForm({ ...form, password })}
          placeholder="********"
          placeholderTextColor="#6b7280"
          style={styles.inputControl}
          secureTextEntry
          value={form.password}
        />
      </View>

      {/* SignIn Button */}
      <View style={styles.formAction}>
        <TouchableOpacity onPress={handleLogin}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Sign in</Text>
          </View>
        </TouchableOpacity>
      </View>

    
    </View>
  );
}
