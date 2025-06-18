import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../utils/urlConfig';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const OrderListScreen = () => {
  const navigation = useNavigation(); // ✅ Correct place
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

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`${BASE_URL}/api/order/${orderId}`);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useFocusEffect(
  useCallback(() => {
    fetchOrders();
  }, [])
);


  const renderOrder = ({ item }) => {
    const totalQuantity = item.items.reduce((sum, p) => sum + p.quantity, 0);
    const totalPrice = item.items.reduce((sum, p) => sum + p.product_id?.price * p.quantity, 0);

    return (
      <View style={styles.card}>
        {/* Header Row with Title and Hamburger */}
        <View style={styles.rowSpaceBetween}>
          <Text style={styles.title}>Order Summary</Text>

          <Menu>
            <MenuTrigger>
              <Text style={{ fontSize: 22, paddingHorizontal: 8 }}>☰</Text>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption
                onSelect={() => {
                  navigation.navigate('EditOrder', { orderData: item });
                }}
                text="Edit"
              />
              <MenuOption
                onSelect={() => {
                  Alert.alert(
                    'Delete Order',
                    'Are you sure? Do you want to delete this order?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Delete',
                        onPress: () => deleteOrder(item._id),
                        style: 'destructive',
                      },
                    ]
                  );
                }}
                text="Delete"
              />
            </MenuOptions>
          </Menu>
        </View>

        <View style={styles.rowSpaceBetween}>
          <Text>Salesman Name: {item.user?.username}</Text>
          <Text>Date: {new Date(item.createdAt).toISOString().slice(0, 10)}</Text>
        </View>

        <View style={styles.orderBox}>
          <View style={styles.rowSpaceBetween}>
            <View>
              <Text>City: {item.city?.name}</Text>
              <Text>Area: {item.area?.name}</Text>
            </View>
            <View>
              <Text>Shop: {item.shop?.name}</Text>
              <Text>Status: {item.status}</Text>
            </View>
          </View>

          <View style={styles.tableHeader}>
            <Text style={styles.cell}>Name</Text>
            <Text style={styles.cell}>Price (PKR)</Text>
            <Text style={styles.cell}>Quantity</Text>
          </View>

          {item.items.map((product, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.cell}>{product.product_id?.name}</Text>
              <Text style={styles.cell}>{product.product_id?.price}</Text>
              <Text style={styles.cell}>{product.quantity}</Text>
            </View>
          ))}

          <View style={styles.totalRow}>
            <Text style={styles.cell}>Items: {item.items.length}</Text>
            <Text style={styles.cell}>{totalPrice.toFixed(2)}</Text>
            <Text style={styles.cell}>{totalQuantity}</Text>
          </View>
        </View>

        <View style={{ marginTop: 16 }}>
          <Text>Total Quantity: {totalQuantity}</Text>
          <Text style={styles.grandTotal}>Grand Total: {totalPrice.toFixed(2)} Rs</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#000" style={{ flex: 1 }} />;
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item._id}
      renderItem={renderOrder}
      contentContainerStyle={styles.container}
    />
  );
};

export default OrderListScreen;


const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderBox: {
    backgroundColor: '#d3dce6',
    padding: 12,
    borderRadius: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 12,
    paddingVertical: 6,
    backgroundColor: '#b3c0d1',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  totalRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    backgroundColor: '#9cadc6',
    marginTop: 8,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  grandTotal: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
  },
});
