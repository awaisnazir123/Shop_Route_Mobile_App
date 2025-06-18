import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, Alert, ActivityIndicator, ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../utils/urlConfig';
import axios from 'axios';

export default function DashboardScreen() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [shops, setShops] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsername();
    fetchCities();
  }, []);

  const fetchUsername = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedUserId = await AsyncStorage.getItem('userId');
      //console.log('Stored Username:', storedUsername);
      //console.log('Stored UserId:', storedUserId);
      if (storedUsername) setUsername(storedUsername);
      if (storedUserId) setUserId(storedUserId);
    } catch (error) {
      console.error('Error getting username or userId', error);
    }
  };

  const fetchCities = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/city`);
      setCities(res.data.response);
    } catch (err) {
      Alert.alert('Error', 'Failed to load cities');
    } finally {
      setLoading(false);
    }
  };

  const fetchAreas = async (cityId) => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/area?cityId=${cityId}`);
      setAreas(res.data.response);
    } catch (err) {
      Alert.alert('Error', 'Failed to load areas');
    } finally {
      setLoading(false);
    }
  };

  const fetchShops = async (areaId) => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/shop?areaId=${areaId}`);
      setShops(res.data.response);
    } catch (err) {
      Alert.alert('Error', 'Failed to load shops');
      setShops([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedArea(null);
    setShops([]);
    fetchAreas(city._id);
  };

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
    fetchShops(area._id);
  };

  const handleShopSelect = (shop) => {

   // console.log('User ID:', userId);
  //console.log('Selected City:', selectedCity);
  //console.log('Selected Area:', selectedArea);
  //console.log('Selected Shop:', shop);

  if (!userId) {
    Alert.alert('Error', 'User ID not found. Please log in again.');
    return;
  }

  navigation.navigate('ProductSelectionScreen', {
    /* userId: userId,
  cityId: selectedCity._id,
  areaId: selectedArea._id,
  shopId: shop._id,*/
   screen: 'ProductSelection',
   params:{
  userId,
  cityId: selectedCity._id,
  areaId: selectedArea._id,
  shopId: shop._id,
   },
  });
  };

  const renderCard = (label, items, selectedId, onSelect) => {
    if (!Array.isArray(items)) return null;

    return (
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, textAlign: 'center', marginTop: 50 }}>
          {label}
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 }}>
          {items.map((item) => (
            <TouchableOpacity
              key={item._id}
              onPress={() => onSelect(item)}
              style={{
                backgroundColor: selectedId === item._id ? '#007bff' : '#ffffff',
                borderColor: '#007bff',
                borderWidth: 1,
                borderRadius: 10,
                margin: 6,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
                width: 150,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: selectedId === item._id ? '#fff' : '#007bff', fontWeight: '600' }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderShopCards = () => {
    return (
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' }}>
          Shops in {selectedArea.name}
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {shops.map((shop) => (
            <View
              key={shop._id}
              style={{
                backgroundColor: '#f2f2f2',
                borderColor: '#000',
                borderWidth: 1,
                borderRadius: 6,
                padding: 10,
                margin: 6,
                width: 160,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 14, textAlign: 'center' }}>{shop.name}</Text>
              <Text style={{ marginTop: 6, textAlign: 'center' }}>Owner: {shop.ownername}</Text>
              <Text style={{ textAlign: 'center' }}>Contact: {shop.contact}</Text>
              <TouchableOpacity
                onPress={() => handleShopSelect(shop)}
                style={{
                  backgroundColor: 'black',
                  paddingVertical: 8,
                  borderRadius: 4,
                  marginTop: 10,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Place Order</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {selectedArea && (
          <TouchableOpacity
            onPress={() => {
              setSelectedArea(null);
              setShops([]);
            }}
            style={{ marginBottom: 10 }}
          >
            <Text style={{ color: '#007bff', fontWeight: 'bold', textAlign: 'center' }}>{'< Back to Areas'}</Text>
          </TouchableOpacity>
        )}
        {selectedCity && !selectedArea && (
          <TouchableOpacity
            onPress={() => {
              setSelectedCity(null);
              setAreas([]);
              setShops([]);
            }}
            style={{ marginBottom: 10 }}
          >
            <Text style={{ color: '#007bff', fontWeight: 'bold', textAlign: 'center' }}>{'< Back to Cities'}</Text>
          </TouchableOpacity>
        )}
        {!selectedCity && (
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 15 }}>
              Welcome {username ? username : 'User'}
            </Text>
          </View>
        )}
        {loading && (
          <ActivityIndicator size="large" color="#007bff" style={{ marginVertical: 20 }} />
        )}
        {!selectedCity && renderCard('Assigned Cities', cities, selectedCity?._id, handleCitySelect)}
        {selectedCity && !selectedArea &&
          renderCard(`Select Area in ${selectedCity.name}`, areas, selectedArea?._id, handleAreaSelect)}
        {selectedArea && renderShopCards()}
      </ScrollView>
    </SafeAreaView>
  );
}