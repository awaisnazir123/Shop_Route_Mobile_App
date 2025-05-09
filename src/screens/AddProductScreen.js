import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AddProductForm from '../components/AddProductForm';

export default function AddProductScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Product</Text>
      <AddProductForm />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
});
