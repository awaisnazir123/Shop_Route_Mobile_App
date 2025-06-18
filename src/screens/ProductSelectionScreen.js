import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-paper';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductCard from '../components/ProductCard';
import { BASE_URL } from '../utils/urlConfig';

const ProductSelectionScreen = ({ route, navigation }) => {
 // console.log('🔍 Received in ProductSelectionScreen:', route?.params);
  /* console.log('users id:',userId);
   console.log('city id:',cityId);
   console.log('area id:',areaId);
   console.log('shop id:',shopId);*/
    //console.log('citys id:',cityId);
   // console.log('areaa id:',areaId);
   // console.log('shops id:',shopId);
 useEffect(() => {
 /*console.log(' Received IDs in ProductSelectionScreen:');
  console.log(' User ID:', userId);
  console.log(' City ID:', cityId);
  console.log(' Area ID:', areaId);
  console.log(' Shop ID:', shopId);*/
}, [userId, cityId, areaId, shopId]);

 const { params } = route || {};
 const {
  userId = null,
  cityId = null,
  areaId = null,
  shopId = null,
} = params || {};

useEffect(() => {
  if (!userId || !cityId || !areaId || !shopId) {
   
    Alert.alert('Navigation Error', 'Missing data for product selection. Please try again.');
    navigation.goBack();
    return;
  }
}, [userId, cityId, areaId, shopId]);


//const { userId, cityId, areaId, shopId } = params;

  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (shopId) fetchProducts();
}, [shopId]);


  const fetchProducts = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('Error', 'Please log in again');
      navigation.navigate('SignInScreen');
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/api/product?shopId=${shopId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data.response)) {
        setProducts(data.response);
      } else {
        setProducts([]);
        Alert.alert('Error', 'No products found for this shop');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      Alert.alert('Error', 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (id, qty) => {
    const updated = { ...quantities, [id]: Math.min(qty, 5) }; // Max quantity 5
    setQuantities(updated);

    let newTotal = 0;
    products.forEach((p) => {
      const q = updated[p._id] || 0;
      newTotal += q * p.price;
    });
    setTotal(newTotal);
  };

  const handleAddProduct = (id) => {
    if (!quantities[id] || quantities[id] === 0) {
      Alert.alert('Error', 'Please select a quantity for the product');
    }
  };

  const handlePlaceOrder = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('Error', 'Please log in again');
      navigation.navigate('SignInScreen');
      return;
    }
    const items = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([product_id, quantity]) => ({ product_id, quantity }));

    if (items.length === 0) {
      Alert.alert('Error', 'Please select at least one product');
      return;
    }

    const orderPayload = {
      user:userId,
      city: cityId,
      area: areaId,
      shop: shopId,
      items,
      paymentMethod,
      price: total,
      status: 'pending',
    };

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      const result = await res.json();
      if (res.ok) {
        Alert.alert('Success', 'Order placed successfully!');
        navigation.navigate('DashboardScreen');
      } else {
        Alert.alert('Error', result.message || 'Failed to place order');
      }
    } catch (err) {
      console.error('Order error:', err);
      Alert.alert('Error', 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 8, backgroundColor: '#e8ecf4' }}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginVertical: 20 }} />
      ) : (
        <>
          <FlatList
            data={products}
            numColumns={2}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                quantity={quantities[item._id] || 0}
                onQuantityChange={handleQuantityChange}
                onAdd={handleAddProduct}
              />
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
              Total: {total.toFixed(2)}
            </Text>
            <Text style={{ fontSize: 16, marginTop: 10, marginLeft: 10 }}>Payment Method: COD</Text>
            {/*
            <Picker
              selectedValue={paymentMethod}
              style={{ height: 50, width: 150, marginLeft: 10 }}
              onValueChange={(itemValue) => setPaymentMethod(itemValue)}
            >
              <Picker.Item label="Cash on Delivery" value="cod" /> 
              <Picker.Item label="Card" value="card" />
            </Picker> */}
          </View>
          <Button
            mode="contained"
            onPress={handlePlaceOrder}
            disabled={loading}
            style={{ margin: 10, backgroundColor: '#007bff' }}
          >
            Place Order
          </Button>
        </>
      )}
    </View>
  );
};

export default ProductSelectionScreen;
