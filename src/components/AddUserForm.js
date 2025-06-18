
import React, { useState, useEffect } from 'react';
import validator from 'validator';
import emojiRegex from 'emoji-regex';
const emoji_pattern = emojiRegex();
import { styles } from '../styles/addUserForm.style'

import { BASE_URL } from '../utils/urlConfig';
import { TextInput, Text, Alert, TouchableOpacity, ScrollView } from 'react-native';

import axios from 'axios';

export default function AddUserForm() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
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

    setLoading(true);

    try {
      const userData = {
        username,
        email,
        password
      };

      const res = await axios.post(`${BASE_URL}/api/user`, userData);

      Alert.alert('Success', res.data.message);
      setUsername('');

    } catch (error) {
      if (error.response?.data?.details) {
        const messages = error.response.data.details.map((d) => d.message).join('\n');
        Alert.alert('Validation Error', messages);
      } else {
        Alert.alert('Error', error.response?.data?.message || 'Could not submit user');
      }

    } finally {
      setLoading(false);
    }

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>User Name</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="User Name" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />

      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}></ScrollView>


      
      <TouchableOpacity style={[styles.button, loading && { backgroundColor: '#999' }]} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Add User'}</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}


