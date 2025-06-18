//import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { useNavigation, useFocusEffect} from '@react-navigation/native';
import { styles } from '../styles/areaScreen.style'
import { BASE_URL } from '../utils/urlConfig';

export default function AreasScreen() {
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState([]);
  const [city, setCity] = useState([]);

  const navigation = useNavigation();


  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerRight: () => (
        <TouchableOpacity
          style={{
            backgroundColor: '#007bff',
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 20,
            marginRight: 10,
          }}
          onPress={() => navigation.navigate('AddArea')}
        >
          <Text style={styles.headerButtonText}>+ Add New Area</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

 useFocusEffect(
       useCallback(() => {
   
         fetchArea();
       }, [])
     );

  const fetchArea = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/area`);
      //console.log(JSON.stringify(response.data.response, null, 2));
      setArea(response.data.response);
    } catch (error) {
      console.error('Error fetching areas:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCity = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/city`);
      setCity(res.data.response);
    } catch (error) {
      console.error('Error fetching areas:', error);
    }
  };

  useEffect(() => {
    fetchArea();
    fetchCity();
  }, []);

  const getCityName = (id) => {
    const cit = city.find((c) => c._id === id);
    return cit ? cit.name : '-';
  };

  const handleDelete = async (areaId) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this Area?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const areaRes = await axios.delete(`${BASE_URL}/api/area/${areaId}`);

              Alert.alert('Success', areaRes.data.message);
              fetchArea(); // Refresh list
            } catch (error) {
              console.error('Error deleting area:', error);
              const errorMessage = error?.response?.data?.message;
              Alert.alert('Error', errorMessage);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading areas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Areas List</Text>

      <ScrollView>
        <View>
          {/* Table Header */}
          <View style={[styles.row, styles.headerRow,]}>
            {['Area Name', 'City', 'Actions'].map((heading, index) => (
              <Text
                key={index}
                style={[styles.cell, styles.headerText, heading === 'Actions' && styles.actionheading,
                heading === 'City' && styles.cityheading]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {heading}
              </Text>

            ))}
          </View>

          {/* Table Data */}
          {area.map((item) => (
            <View key={item._id} style={styles.row}>
              <View style={{ flex: 1, paddingLeft: 10 }}>
                <Text style={styles.cell}>{item.name}</Text>
                <Text style={styles.citycell}>{getCityName(item.city._id)}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'red',
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 6,
                    marginRight: 10

                  }}
                  onPress={() => handleDelete(item._id)}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: 'green',
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 6,

                  }}
                  onPress={() => navigation.navigate('EditArea', { area: item })}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Edit</Text>
                </TouchableOpacity>

              </View>
            </View>
          ))}
        </View>
      </ScrollView>

    </View>
  );
}

