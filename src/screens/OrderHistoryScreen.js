import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../utils/urlConfig';

export default function OrderHistoryScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/order`);
      setOrders(response.data.response);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.email}>📧 {item.user?.email}</Text>
      <Text style={styles.location}>🏙️ {item.city?.name} → {item.area?.name} → 🏪 {item.shop?.name}</Text>

      <Text style={styles.productsTitle}>🛒 Products:</Text>

      {Array.isArray(item.items) ? (
        item.items.map((orderItem, index) => (
          <Text key={index} style={styles.productLine}>
            {orderItem.product_id && orderItem.product_id.name
              ? `• ${orderItem.product_id.name} x ${orderItem.quantity} = Rs ${orderItem.product_id.price * orderItem.quantity}`
              : '⏳ Loading product...'}
          </Text>
        ))
      ) : (
        <Text style={{ color: 'red' }}>⚠️ No products found</Text>
      )}

      <Text style={styles.total}>💰 Total: Rs {item.price}</Text>
      <Text style={styles.date}>📅 {new Date(item.createdAt).toLocaleString()}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007700" />
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item._id}
      renderItem={renderOrder}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f3f2f2',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  email: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#333'
  },
  location: {
    marginBottom: 6,
    color: '#555',
  },
  productsTitle: {
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  productLine: {
    marginLeft: 8,
    color: '#444',
  },
  total: {
    fontWeight: 'bold',
    marginTop: 8,
    color: '#007700'
  },
  date: {
    marginTop: 4,
    fontSize: 12,
    color: '#888'
  }
});
