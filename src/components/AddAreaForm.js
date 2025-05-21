import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { styles } from '../styles/addAreaForm.style';
import { View, TextInput, Text, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { BASE_URL } from '../utils/urlConfig';
import axios from 'axios';

export default function AddAreaForm() {
  const [name, setName] = useState('');
  const [city, setCity] = useState([]); // List of cities
  const [selectedCity, setSelectedCity] = useState(''); // Selected city ID
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/city`);
        setCity(res.data.response);
      } catch (error) {
        console.error('Error fetching cities:', error);
        Alert.alert('Error', 'Failed to fetch cities');
      }
    };
    fetchCity();
  }, []);

  const handleSubmit = async () => {
    if (name.trim().length < 3) {
      Alert.alert('Validation Error', 'Name must be at least 3 characters long.');
      return;
    }

    if (!selectedCity) {
      Alert.alert('Validation Error', 'Please select a city.');
      return;
    }

    setLoading(true);

    try {
      const areaData = {
        name,
        city: selectedCity,
      };

      const res = await axios.post(`${BASE_URL}/api/area`, areaData);

      Alert.alert('Success', res.data.message);
      setName('');
      setSelectedCity('');
    } catch (error) {
      if (error.response?.data?.details) {
        const messages = error.response.data.details.map((d) => d.message).join('\n');
        Alert.alert('Validation Error', messages);
      } else {
        Alert.alert('Error', error.response?.data?.message || 'Could not submit area');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Area Name"
      />

      <Text style={styles.label}>City</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCity}
          onValueChange={(value) => setSelectedCity(value)}
        >
          <Picker.Item label="Select City" value="" />
          {city.map((cit) => (
            <Picker.Item key={cit._id} label={cit.name} value={cit._id} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        style={[styles.button, loading && { backgroundColor: '#999' }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Submitting...' : 'Add Area'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
