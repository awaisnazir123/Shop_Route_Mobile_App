// src/components/RegisterForm.js
import React from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import validator from 'validator';
import emojiRegex from 'emoji-regex';
const emoji_pattern = emojiRegex();
import { styles } from '../styles/signIn.style'; // Importing styles
import { BASE_URL } from '../utils/urlConfig';


export default function RegisterForm({ form, setForm }) {
  const navigation = useNavigation();
  const handleRegister = () => {
    const { username, email, password } = form;
    const regex = emojiRegex();

    if (
      !validator.isLength(username, { min: 3 }) ||
      !/^[a-zA-Z0-9_]+$/.test(username) ||
      emoji_pattern.test(username)
    ) {
      Alert.alert('Invalid Username', 'Username must be at least 3 characters long, contain only letters and numbers not spaces, emojis and special characters.');
      return;
    }

    if (!validator.isEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
    }

    if (!validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })) {
      Alert.alert('Weak Password', 'Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.');
      return;
    }

    fetch(`${BASE_URL}/api/auth/register`, {
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
            Alert.alert('Success', data.message || 'User registered successfully!', [
              {
                text: 'OK',
                onPress: () => navigation.navigate('SignInScreen'), // Navigate here
              },
            ]);
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
        <Text style={styles.inputLabel}>Username</Text>
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
        <TouchableOpacity onPress={handleRegister}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Register</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
        <Text style={{ color: 'blue', marginTop: 20, textAlign: 'center' }}>
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>

    </View>
  );
}
