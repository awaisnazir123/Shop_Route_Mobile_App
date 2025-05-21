import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { BASE_URL } from '../utils/urlConfig';
import { styles } from '../styles/addShopForm.style';

export default function AddShopForm({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    ownername: '',
    city: '',
    area: '',
  });

  const [cities, setCities] = useState([]);
  const [allAreas, setAllAreas] = useState([]);
  const [filteredAreas, setFilteredAreas] = useState([]);

  useEffect(() => {
    fetchCities();
    fetchAreas();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/city`);
      setCities(response.data.response);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const fetchAreas = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/area`);
      const data = await res.json();
      setAllAreas(data.response);
    } catch (err) {
      console.error("Error fetching areas:", err);
    }
  };

  const handleCityChange = (cityId) => {
    setFormData({ ...formData, city: cityId, area: '' });
    const filtered = allAreas.filter(area => area.city === cityId);
    setFilteredAreas(filtered);
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const { name, contact, ownername, city, area } = formData;

    if (!name || !contact || !ownername || !city || !area) {
      Alert.alert('Validation Error', 'Please fill all fields');
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/shop`, formData);
      Alert.alert('Success', res.data.message);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding shop:', error);
      Alert.alert('Error', error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Shop</Text>

      <Text style={styles.label}>Shop Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter shop name"
        value={formData.name}
        onChangeText={(text) => handleChange('name', text)}
      />

      <Text style={styles.label}>Contact</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter contact number"
        value={formData.contact}
        onChangeText={(text) => handleChange('contact', text)}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Owner Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter owner name"
        value={formData.ownername}
        onChangeText={(text) => handleChange('ownername', text)}
      />

      <Text style={styles.label}>Select City</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.city}
          onValueChange={(itemValue) => handleCityChange(itemValue)}
        >
          <Picker.Item label="Select City" value="" />
          {cities.map((city) => (
            <Picker.Item key={city._id} label={city.name} value={city._id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Select Area</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.area}
          onValueChange={(value) => handleChange('area', value)}
        >
          <Picker.Item label="Select Area" value="" />
          {filteredAreas.map((area) => (
            <Picker.Item key={area._id} label={area.name} value={area._id} />
          ))}
        </Picker>
      </View>

      {/* ✅ Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Add Shop</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
