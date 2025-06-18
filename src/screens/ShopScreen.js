import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect} from '@react-navigation/native';
import { BASE_URL } from '../utils/urlConfig';
import { styles } from '../styles/shopScreen.style';

export default function ShopScreen() {
  const [shops, setShops] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerRight: () => (
        <TouchableOpacity
          style={{
            backgroundColor: '#007bff',
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 20,
            marginRight: 10,
          }}
          onPress={() => navigation.navigate('AddShop')}
        >
          <Text style={styles.headerButtonText}>+ Add New Shop</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useFocusEffect(
       useCallback(() => {

    fetchShops();
    fetchCities();
    fetchAreas();

       }, [])
     );

  const fetchShops = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/shop`);
      setShops(res.data.response);
    } catch (err) {
      console.error('Error fetching shops:', err);
    } finally {
      setLoading(false);
    }
  };

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
      setAreas(res.data.response);
    } catch (err) {
      console.error('Error fetching areas:', err);
    }
  };

  const getCityName = (id) => {
    const city = cities.find((c) => c._id === id);
    return city ? city.name : '-';
  };

  const getAreaName = (id) => {
    const area = areas.find((a) => a._id === id);
    return area ? area.name : '-';
  };

  const handleDelete = (shopId) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this shop?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const res = await axios.delete(`${BASE_URL}/api/shop/${shopId}`);
              Alert.alert('Success', res.data.message);
              fetchShops();
            } catch (error) {
              console.error('Delete Error:', error);
              Alert.alert('Error', error?.response?.data?.message || 'Error deleting shop');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading shops...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shops List</Text>
      <ScrollView horizontal>
        <ScrollView>
          <View>
            {/* Header Row */}
            <View style={[styles.row, styles.headerRow]}>
              {['Name', 'Contact', 'City', 'Area', 'Actions'].map((heading, i) => (
                <Text key={i} style={[styles.cell, styles.headerText]} numberOfLines={1}>
                  {heading}
                </Text>
              ))}
            </View>

            {/* Data Rows */}
            {shops.map((shop) => (
              <View key={shop._id} style={styles.row}>
                <Text style={styles.cell}>{shop.name}</Text>
                <Text style={styles.cell}>{shop.contact}</Text>
                <Text style={styles.cell}>{getCityName(shop.city._id)}</Text>
                <Text style={styles.cell}>{getAreaName(shop.area._id)}</Text>

                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'red',
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 6,
                      marginRight: 6,
                    }}
                    onPress={() => handleDelete(shop._id)}
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
                    onPress={() => navigation.navigate('EditShop', {
                      shop, onShopUpdated: fetchShops
                    })}

                  >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Edit</Text>
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
