import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductCard from '../components/ProductCard';
import { BASE_URL } from '../utils/urlConfig';

const EditOrderScreen = ({ route, navigation }) => {
  const { orderData } = route.params;

  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (orderData && orderData.items) {
      const initialQuantities = {};
      const productList = [];

      orderData.items.forEach(item => {
        initialQuantities[item.product_id._id] = item.quantity;
        productList.push(item.product_id);
      });

      setQuantities(initialQuantities);
      setProducts(productList);

      // Calculate total
      let initialTotal = 0;
      productList.forEach(p => {
        const qty = initialQuantities[p._id] || 0;
        initialTotal += qty * p.price;
      });
      setTotal(initialTotal);
    }
  }, [orderData]);

  const handleQuantityChange = (id, qty) => {
    const updated = { ...quantities, [id]: Math.min(qty, 5) }; // max 5
    setQuantities(updated);

    let newTotal = 0;
    products.forEach((p) => {
      const q = updated[p._id] || 0;
      newTotal += q * p.price;
    });
    setTotal(newTotal);
  };

  const handleUpdateOrder = async () => {
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

    const updatedOrder = {
      user: orderData.user._id,
      city: orderData.city._id,
      area: orderData.area._id,
      shop: orderData.shop._id,
      items,
      paymentMethod: orderData.paymentMethod,
      price: total,
      status: orderData.status,
    };

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/order/${orderData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedOrder),
      });

      const result = await res.json();
      if (res.ok) {
        Alert.alert('Success', 'Order updated successfully!');
        navigation.goBack();
      } else {
        Alert.alert('Error', result.message || 'Failed to update order');
      }
    } catch (err) {
      console.error('Update error:', err);
      Alert.alert('Error', 'Failed to update order. Please try again.');
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
                onAdd={() => {}}
              />
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
              Total: {total.toFixed(2)}
            </Text>
            <Text style={{ fontSize: 16, marginTop: 10, marginLeft: 10 }}>
              Payment Method: {orderData.paymentMethod.toUpperCase()}
            </Text>
          </View>
          <Button
            mode="contained"
            onPress={handleUpdateOrder}
            disabled={loading}
            style={{ margin: 10, backgroundColor: '#28a745' }}
          >
            Update Order
          </Button>
        </>
      )}
    </View>
  );
};

export default EditOrderScreen;
