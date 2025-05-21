import React, { useEffect, useState } from 'react';
import { ScrollView,View, TextInput, Text, Button, StyleSheet, Alert, TouchableOpacity, Image  } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import {styles} from '../styles/editProductForm.style';
import { BASE_URL } from '../utils/urlConfig';
const EditProductForm = ({ product}) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(String(product.price));
  const [category, setCategory] = useState(product.category);
  const [subcategory, setSubcategory] = useState(product.subcategory);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([...product.images]);

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraStatus.status !== 'granted') {
        Alert.alert('Permission denied', 'We need camera access to take photos.');
      }

      if (galleryStatus.status !== 'granted') {
        Alert.alert('Permission denied', 'We need access to your gallery.');
      }
    })();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/category`);
        setCategories(res.data.response);
      } catch (error) {
        console.error('Error fetching categories:', error);
        Alert.alert('Error', 'Failed to fetch categories');
      }
    };
    fetchCategories();
  }, []);

const uploadImage = async (uri) => {
  const fileName = uri.split('/').pop();
  const match = /\.(\w+)$/.exec(fileName || '');
  const ext = match ? match[1] : 'jpg';
  const mimeType = `image/${ext}`;

  const formData = new FormData();
  formData.append('image', {
    uri,
    name: fileName,
    type: mimeType,
  });

  try {
    const res = await axios.post(`${BASE_URL}/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setImages(prev => [...prev, res.data.url]);
  } catch (err) {
    console.error('Upload error:', err.response?.data || err.message);
    Alert.alert('Error', 'Image upload failed');
  }
};




const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      const selected = result.assets.map((asset) => asset.uri);
      setImages([...images, ...selected]);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    if (!result.canceled) {
      const photoUri = result.assets[0].uri;
      setImages([...images, photoUri]);
    }
  };


  const handleDeleteImage = async (imgUrl) => {
    const filename = imgUrl.split('/').pop();
    try {
      
      setImages(images.filter(img => img !== imgUrl));
    } catch (err) {
      console.error('Image delete error:', err);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.put(`${BASE_URL}/api/product/${product._id}`, {
        name,
        price,
        category,
        subcategory,
        images,
      });
      Alert.alert('Success', res.data.message || 'Product updated');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Update failed';
      Alert.alert('Error', msg);
    }
  };

  const subcategories = categories.find((c) => c._id === category)?.subcategories || [];

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
    <View>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Price</Text>
      <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />

      <Text style={styles.label}>Category</Text>
     <View style={styles.pickerContainer}>
             <Picker
               selectedValue={category}
               onValueChange={(value) => {
                 setCategory(value);
                 setSubcategory('');
               }}>
               <Picker.Item label="Select Category" value="" />
               {categories.map((cat) => (
                 <Picker.Item key={cat._id} label={cat.name} value={cat._id} />
               ))}
             </Picker>
           </View>

      <Text style={styles.label}>Subcategory</Text>
      <View style={styles.pickerContainer}>
              <Picker selectedValue={subcategory} onValueChange={setSubcategory} enabled={subcategories.length > 0}>
                <Picker.Item label="Select Subcategory" value="" />
                {subcategories.map((sub, index) => (
                  <Picker.Item key={index} label={sub} value={sub} />
                ))}
              </Picker>
            </View>

      <Text style={styles.label}>Images</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {images.map((img, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri: img }} style={styles.image} />
            <TouchableOpacity
              style={styles.cross}
              onPress={() => handleDeleteImage(img)}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
  <TouchableOpacity style={styles.imagePicker} onPress={pickFromGallery}>
    <Text style={styles.imagePickerText}>Pick from Gallery</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.imagePicker} onPress={takePhoto}>
    <Text style={styles.imagePickerText}>Take Photo</Text>
  </TouchableOpacity>
</View>


      
      <View style={ styles.button }>
        <Button style={styles.buttonText} title="Update Product" onPress={handleSubmit} color="green" />
      </View> 
      
    </View>
    

    
    </ScrollView>
  );
};

export default EditProductForm;
