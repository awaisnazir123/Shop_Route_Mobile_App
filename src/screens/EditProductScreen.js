import React from 'react';
import { View, StyleSheet } from 'react-native';
import EditProductForm from '../components/EditProductForm';

const EditProductScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <EditProductForm product={product} />
    </View>
  );
};

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

export default EditProductScreen;
