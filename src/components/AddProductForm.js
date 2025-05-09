import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function AddProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

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
        const res = await axios.get('http://192.168.0.194:5000/api/category');
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        Alert.alert('Error', 'Failed to fetch categories');
      }
    };
    fetchCategories();
  }, []);

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

  const handleSubmit = async () => {
    if (name.trim().length < 3) {
      Alert.alert('Validation Error', 'Name must be at least 3 characters long.');
      return;
    }
    setLoading(true);
    let imageUrls = [];

    try {
      if (images.length > 0) {
        const imageForm = new FormData();
        images.forEach((uri, index) => {
          imageForm.append('images', {
            uri,
            name: `photo_${index}.jpg`,
            type: 'image/jpeg',
          });
        });

        const uploadRes = await axios.post('http://192.168.0.194:5000/api/upload', imageForm, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        imageUrls = uploadRes.data.filePaths;
      }

      const productData = {
        name,
        price: parseFloat(price),
        category,
        subcategory,
      };

      if (imageUrls.length > 0) {
        productData.images = imageUrls;
      }

      

      const res=await axios.post('http://192.168.0.194:5000/api/product', productData);

      Alert.alert('Success',res.data.message);
      setName('');
      setPrice('');
      setCategory('');
      setSubcategory('');
      setImages([]);
    } catch (error) {
      if(error.response?.data?.details){
        const messages = error.response.data.details.map((d) => d.message).join('\n');
        Alert.alert('Validation Error', messages);
      }else{
        Alert.alert('Error', error.response?.data?.message || 'Could not submit product');
      }
      
    } finally {
      setLoading(false);
    }
    
  };

  const selectedCategoryObj = categories.find((c) => c._id === category);
  const subcategories = selectedCategoryObj ? selectedCategoryObj.subcategories : [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Product Name" />

      <Text style={styles.label}>Price</Text>
      <TextInput style={styles.input} value={price} onChangeText={setPrice} placeholder="Product Price" keyboardType="numeric" />

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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity style={styles.imagePicker} onPress={pickFromGallery}>
          <Text style={styles.imagePickerText}>Pick from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imagePicker} onPress={takePhoto}>
          <Text style={styles.imagePickerText}>Take Photo</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
  {images.map((uri, idx) => (
    <View key={idx} style={{ position: 'relative', margin: 5 }}>
      <Image
        source={{ uri }}
        style={{ width: 100, height: 100, borderRadius: 8 }}
      />
      <TouchableOpacity
        onPress={() => {
          const newImages = images.filter((_, i) => i !== idx);
          setImages(newImages);
        }}
        style={{
          position: 'absolute',
          top: -8,
          right: -8,
          backgroundColor: 'red',
          borderRadius: 12,
          width: 24,
          height: 24,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>×</Text>
      </TouchableOpacity>
    </View>
  ))}
</ScrollView>


      <TouchableOpacity style={[styles.button, loading && { backgroundColor: '#999' }]} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Add Product'}</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 40, paddingHorizontal: 16 },
  label: { marginTop: 12, fontWeight: '600', fontSize: 16 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, marginTop: 6,
  },
  pickerContainer: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10, marginTop: 6,
  },
  imagePicker: {
    marginTop: 10, padding: 12, backgroundColor: '#f0f0f0',
    borderRadius: 10, alignItems: 'center', flex: 1, marginHorizontal: 4,
  },
  imagePickerText: { color: '#333' },
  button: {
    marginTop: 20, backgroundColor: '#007bff',
    paddingVertical: 14, borderRadius: 10, alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
