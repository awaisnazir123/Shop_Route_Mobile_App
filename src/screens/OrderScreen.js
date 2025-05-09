import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { styles } from '../styles/orders.style';
import OrderForm from '../components/OrderForm';

export default function OrdersScreen() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    city: '',
    area: '',
    shop: '',
    quantity: '',
    paymentmethod: '',
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Create <Text style={{ color: '#075eec' }}>Order</Text>
          </Text>
        </View>

        <OrderForm form={form} setForm={setForm} />
      </View>
    </SafeAreaView>
  );
}
