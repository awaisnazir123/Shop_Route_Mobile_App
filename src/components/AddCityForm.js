
import React, { useState, useEffect } from 'react';
import { styles } from '../styles/addCityForm.style'

import { BASE_URL } from '../utils/urlConfig';
import { TextInput, Text, Alert, TouchableOpacity, ScrollView } from 'react-native';

import axios from 'axios';

export default function AddCityForm() {

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (name.trim().length < 3) {
      Alert.alert('Validation Error', 'Name must be at least 3 characters long.');
      return;
    }
    setLoading(true);

    try {
      const cityData = {
        name,
      };

      const res = await axios.post(`${BASE_URL}/api/city`, cityData);

      Alert.alert('Success', res.data.message);
      setName('');

    } catch (error) {
      if (error.response?.data?.details) {
        const messages = error.response.data.details.map((d) => d.message).join('\n');
        Alert.alert('Validation Error', messages);
      } else {
        Alert.alert('Error', error.response?.data?.message || 'Could not submit city');
      }

    } finally {
      setLoading(false);
    }

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="City Name" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>


      </ScrollView>
      <TouchableOpacity style={[styles.button, loading && { backgroundColor: '#999' }]} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Add City'}</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}


