import React, { useState } from 'react';
import { TextInput, Text, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { styles } from '../styles/editCityForm.style';
import { BASE_URL } from '../utils/urlConfig'

export default function EditCityForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const { city } = route.params;
  const [name, setName] = useState(city.name);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (name.trim().length < 3) {
      Alert.alert('Validation Error', 'Name must be at least 3 characters long.');
      return;
    }
    setLoading(true);
    try {
      const cityData = { name };
      const res = await axios.put(`${BASE_URL}/api/city/${city._id}`, cityData);
      Alert.alert('Success', res.data.message);
      navigation.goBack();
    } catch (error) {
      if (error.response?.data?.details) {
        const messages = error.response.data.details.map((d) => d.message).join('\n');
        Alert.alert('Validation Error', messages);
      } else {
        Alert.alert('Error', error.response?.data?.message || 'Could not update city');
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
        placeholder="City Name"
      />
      <TouchableOpacity
        style={[styles.button, loading && { backgroundColor: '#999' }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Updating...' : 'Update City'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

