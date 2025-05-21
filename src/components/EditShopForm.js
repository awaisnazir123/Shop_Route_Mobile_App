// EditShopForm.js
import React, { useEffect, useState } from 'react';
import { ScrollView, View, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { BASE_URL } from '../utils/urlConfig';
import { styles } from '../styles/editShopForm.style';

export default function EditShopForm({ shop, navigation, onShopUpdated }) {
  const [formData, setFormData] = useState({
    name: shop.name,
    ownername: shop.ownername,
    contact: shop.contact,
    city: shop.city,
    area: shop.area,
  });

  const [cities, setCities] = useState([]);
  const [allAreas, setAllAreas] = useState([]); // sab areas yahan aayenge
  const [filteredAreas, setFilteredAreas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCities();
    fetchAreas();
  }, []);

  useEffect(() => {
    // Jab bhi city change ho, filtered areas update hon
    const matchedAreas = allAreas.filter((area) => area.city === formData.city);
    setFilteredAreas(matchedAreas);
  }, [formData.city, allAreas]);

  const fetchCities = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/city`);
      setCities(res.data.response);
    } catch (err) {
      console.error('Error fetching cities:', err);
    }
  };

  const fetchAreas = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/area`);
      setAllAreas(res.data.response);
      // First time load ke liye filter karo:
      const matched = res.data.response.filter((a) => a.city === shop.city);
      setFilteredAreas(matched);
    } catch (err) {
      console.error('Error fetching areas:', err);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`${BASE_URL}/api/shop/${shop._id}`, formData);
      Alert.alert('Success', response.data.message);
      onShopUpdated();
      navigation.goBack();
    } catch (error) {
      console.error('Error updating shop:', error);
      Alert.alert('Error', error?.response?.data?.message || 'Error updating shop');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 30 }}>
      <View>
        <Text style={styles.label}>Shop Name</Text>
        <TextInput
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          style={styles.input}
        />

        <Text style={styles.label}>Owner Name</Text>
        <TextInput
          value={formData.ownername}
          onChangeText={(text) => setFormData({ ...formData, ownername: text })}
          style={styles.input}
        />

        <Text style={styles.label}>Contact Number</Text>
        <TextInput
          value={formData.contact}
          onChangeText={(text) => setFormData({ ...formData, contact: text })}
          style={styles.input}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>City</Text>
        <Picker
          selectedValue={formData.city}
          onValueChange={(itemValue) =>
            setFormData({ ...formData, city: itemValue, area: '' }) // area reset
          }
          style={styles.input}
        >
          <Picker.Item label="Select City" value="" />
          {cities.map((city) => (
            <Picker.Item key={city._id} label={city.name} value={city._id} />
          ))}
        </Picker>

        <Text style={styles.label}>Area</Text>
        <Picker
          selectedValue={formData.area}
          onValueChange={(itemValue) => setFormData({ ...formData, area: itemValue })}
          style={styles.input}
          enabled={filteredAreas.length > 0}
        >
          <Picker.Item label="Select Area" value="" />
          {filteredAreas.map((area) => (
            <Picker.Item key={area._id} label={area.name} value={area._id} />
          ))}
        </Picker>

        <TouchableOpacity style={styles.button} onPress={handleUpdate} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Update Shop</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
