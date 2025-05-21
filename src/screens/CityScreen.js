// CityScreen.js
import React, { useState, useLayoutEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../utils/urlConfig';
import { styles } from '../styles/city.style';
export default function CityScreen() {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {

      fetchCity();
    }, [])
  );

  const fetchCity = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/city`);
      setCity(response.data.response);
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (cityId) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this city?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`${BASE_URL}/api/city/${cityId}`);
              fetchCity(); // Refresh list
            } catch (error) {
              console.error('Error deleting city:', error);
            }
          },
        },
      ]
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate('AddCity')}
        >
          <Text style={styles.headerButtonText}>+ Add New City</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading cities...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cities List</Text>
      <ScrollView horizontal>
        <ScrollView>
          <View>
            {/* Table Header */}
            <View style={[styles.row, styles.headerRow]}>
              {['Name', 'Actions'].map((heading, index) => (
                <Text key={index} style={[styles.cell, styles.headerText, heading === 'Actions' && styles.actionheading]}>
                  {heading}
                </Text>
              ))}
            </View>

            {/* Table Data */}
            {city.map((item) => (
              <View key={item._id} style={styles.row}>
                <Text style={styles.cell}>{item.name}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('EditCity', { city: item })}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item._id)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}
