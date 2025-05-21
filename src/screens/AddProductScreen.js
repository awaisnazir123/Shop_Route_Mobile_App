import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AddProductForm from '../components/AddProductForm';
import {styles} from '../styles/addProductScreen.style'
export default function AddProductScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Product</Text>
      <AddProductForm />
    </ScrollView>
  );
}


