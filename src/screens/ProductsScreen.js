//import React from 'react';
import { View, Text,ScrollView, TouchableOpacity,Alert } from 'react-native';
import axios from 'axios';
import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../styles/productsScreen.style';
import { BASE_URL } from '../utils/urlConfig';
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

  useFocusEffect(
      useCallback(() => {
  
        fetchProducts();
      }, [])
    );

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/product`);
      setProducts(response.data.response);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/category`);
      
      setCategories(res.data.response);
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
              const productRes= await axios.delete(`${BASE_URL}/api/product/${productId}`);
              for (const imageUrl of images) {
                const filename = imageUrl.split('/').pop();
                await axios.delete(`${BASE_URL}/api/upload/${filename}`);
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
            {['Name', 'Price(PKR)', 'Category', 'Subcategory','Actions'].map((heading, index) => (
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
              <Text style={styles.cell}>{item.price.toLocaleString('en-PK')}</Text>
              <Text style={styles.cell}>{getCategoryName(item.category)}</Text>
              <Text style={styles.cell}>{getSubcategoryName(item.category, item.subcategory)}</Text>
              

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

