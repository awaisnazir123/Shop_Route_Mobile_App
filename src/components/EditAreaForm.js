import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { styles } from '../styles/editAreaForm.style';
import { BASE_URL } from '../utils/urlConfig';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditAreaForm() {

  const navigation = useNavigation();
  const route = useRoute();

  const area = route.params?.area;
  const areaId = area?._id;
  const existingName = area?.name;
  const existingCityId = area?.city;

  const [areaName, setAreaName] = useState(existingName || '');
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(existingCityId || '');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/city`);
        setCityList(res.data.response || []);
      } catch (err) {
        console.error('Error fetching cities:', err);
        Alert.alert('Error', 'Failed to fetch cities from server');
      }
    };

    fetchCities();
  }, []);

  const handleUpdate = async () => {
    if (areaName.trim().length < 3) {
      Alert.alert('Validation Error', 'Area name must be at least 3 characters');
      return;
    }
    if (!selectedCity) {
      Alert.alert('Validation Error', 'Please select a city');
      return;
    }

    setLoading(true);

    try {
      const updatedData = {
        name: areaName,
        city: selectedCity,
      };

      const res = await axios.put(`${BASE_URL}/api/area/${areaId}`, updatedData);
      Alert.alert('Success', res.data.message || 'Area updated successfully');
      navigation.goBack();
    } catch (err) {
      console.error(err);
      console.log('Response error data:', err.response?.data);
      const msg =
        err.response?.data?.details?.map((d) => d.message).join('\n') ||
        err.response?.data?.message ||
        'Failed to update area';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Area Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter area"
        value={areaName}
        onChangeText={setAreaName}
      />

      <Text style={styles.label}>City</Text>
      <View style={styles.pickerContainer}>
        <Picker style={styles.input}
          selectedValue={selectedCity}
          onValueChange={(itemValue) => setSelectedCity(itemValue)}
        >
          <Picker.Item label="Select a city" value="" />
          {cityList.map((city) => (
            <Picker.Item key={city._id} label={city.name} value={city._id} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        style={[styles.button, loading && { backgroundColor: '#999' }]}
        onPress={handleUpdate}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Updating...' : 'Update Area'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}