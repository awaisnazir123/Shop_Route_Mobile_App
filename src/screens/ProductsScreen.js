//import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity,Alert } from 'react-native';
import axios from 'axios';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function ProductsScreen() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title:"",
      headerRight: () => (
        <TouchableOpacity
        style={{
          backgroundColor: '#007bff',
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 20,
          marginRight: 10,
        }}
          onPress={() => navigation.navigate('AddProduct')}
        >
        <Text style={styles.headerButtonText}>+ Add New Product</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://192.168.0.194:5000/api/product');
      //console.log(JSON.stringify(response.data.response, null, 2));
      setProducts(response.data.response);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://192.168.0.194:5000/api/category');
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const getCategoryName = (id) => {
    const cat = categories.find((c) => c._id === id);
    return cat ? cat.name : '-';
  };
  
  const getSubcategoryName = (categoryId, sub) => {
    const cat = categories.find((c) => c._id === categoryId);
    return cat?.subcategories?.includes(sub) ? sub : '-';
  };
  
  const handleDelete = async (productId, images = []) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const productRes= await axios.delete(`http://192.168.0.194:5000/api/product/${productId}`);
              for (const imageUrl of images) {
                const filename = imageUrl.split('/').pop();
                await axios.delete(`http://192.168.0.194:5000/api/upload/${filename}`);
              }
              Alert.alert('Success', productRes.data.message);
              fetchProducts(); // Refresh list
            } catch (error) {
              console.error('Error deleting product:', error);
              const errorMessage = error?.response?.data?.message;
              Alert.alert('Error', errorMessage);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading products...</Text>
      </View>
    );
  }

  
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products List</Text>
      <ScrollView horizontal>
      <ScrollView>
        <View>
          {/* Table Header */}
          <View style={[styles.row, styles.headerRow]}>
            {['Name', 'Price', 'Category', 'Subcategory', 'Created At','Actions'].map((heading, index) => (
              <Text
                key={index}
                style={[styles.cell, styles.headerText]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {heading}
              </Text>

              

            ))}
          </View>

          {/* Table Data */}
          {products.map((item) => (
            <View key={item._id} style={styles.row}>
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={styles.cell}>${item.price}</Text>
              <Text style={styles.cell}>{getCategoryName(item.category)}</Text>
              <Text style={styles.cell}>{getSubcategoryName(item.category, item.subcategory)}</Text>
              <Text style={styles.cell}>
                {new Date(item.createdAt).toLocaleDateString('en-GB')}
              </Text>

              <TouchableOpacity
              style={{
                backgroundColor: 'red',
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 6,
              }}
              onPress={() => handleDelete(item._id, item.images)}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={{
              backgroundColor: 'green',
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 6,
              marginLeft: 6,
            }}
            onPress={() => navigation.navigate('EditProduct', { product: item })}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Edit</Text>
          </TouchableOpacity>
          

            </View>
          ))}
        </View>
      </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    alignItems: 'center',
  },
  headerRow: {
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  cell: {
    width: 100,  // ✅ fix width to stop breaking
    fontSize: 14,
    color: '#555',
    paddingHorizontal: 5,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#333',
  },
  headerButton: {
  backgroundColor: '#007bff',
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 20,
  marginRight: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 3,
},
headerButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 14,
},

});