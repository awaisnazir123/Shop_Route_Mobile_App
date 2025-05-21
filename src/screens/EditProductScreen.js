import React from 'react';
import { View, StyleSheet } from 'react-native';
import EditProductForm from '../components/EditProductForm';
import {styles} from '../styles/editProductScreen.style'
const EditProductScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <EditProductForm product={product} />
    </View>
  );
};



export default EditProductScreen;
