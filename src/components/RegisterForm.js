// src/components/RegisterForm.js
import React from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { styles } from '../styles/styles'; // Importing styles

export default function RegisterForm({ form, setForm }) {

  const handleRegister = () => {
  
    fetch('http://192.168.0.194:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: form.username,
        email: form.email,
        password: form.password,
      }),
    })
    .then(async (res) => {
      const text = await res.text();
      try {
        const data = JSON.parse(text);
        if (res.ok) {
          Alert.alert('Success', data.message || 'User registered successfully!');
        } else {
          Alert.alert('Error', data.message || 'Something went wrong.');
        }
      } catch (err) {
        console.error('Invalid JSON:', text);
        Alert.alert('Error', 'Server did not return valid data.');
      }
    })
    .catch((err) => {
      console.error('Network error:', err.message);
      Alert.alert('Error', 'Could not connect to server.');
    });
    
  };

  return (
    <View style={styles.form}>
      {/* First Name Input */}
      <View style={styles.input}>
        <Text style={styles.inputLabel}>User Name</Text>
        <TextInput
          autoCapitalize="words"
          autoCorrect={false}
          onChangeText={(username) => setForm({ ...form, username })}
          placeholder="Abc"
          placeholderTextColor="#6b7280"
          style={styles.inputControl}
          value={form.username}
        />
      </View>

      

      {/* Email Input */}
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={(email) => setForm({ ...form, email })}
          placeholder="abc@gmail.com"
          placeholderTextColor="#6b7280"
          style={styles.inputControl}
          value={form.email}
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

      {/* Register Button */}
      <View style={styles.formAction}>
        <TouchableOpacity onPress= { handleRegister }>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Register</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
