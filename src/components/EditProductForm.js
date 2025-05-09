import React, { useEffect, useState } from 'react';
import { ScrollView,View, TextInput, Text, Button, StyleSheet, Alert, TouchableOpacity, Image  } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

const EditProductForm = ({ product}) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(String(product.price));
  const [category, setCategory] = useState(product.category);
  const [subcategory, setSubcategory] = useState(product.subcategory);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([...product.images]);

  useEffect(() => {
    axios.get('http://192.168.0.194:5000/api/category')
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsMultipleSelection: true });

    if (!result.cancelled) {
      const uri = result.assets[0].uri;
      const formData = new FormData();
      formData.append('image', {
        uri,
        name: 'upload.jpg',
        type: 'image/jpeg',
      });

      try {
        const res = await axios.post('http://192.168.0.194:5000/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setImages([...images, res.data.url]);
      } catch (err) {
        console.error('Upload error:', err);
        Alert.alert('Error', 'Image upload failed');
      }
    }
  };

  const handleDeleteImage = async (imgUrl) => {
    const filename = imgUrl.split('/').pop();
    try {
      await axios.delete(`http://192.168.0.194:5000/api/upload/${filename}`);
      setImages(images.filter(img => img !== imgUrl));
    } catch (err) {
      console.error('Image delete error:', err);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.put(`http://192.168.0.194:5000/api/product/${product._id}`, {
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

      <Button title="Add Image" onPress={handleImagePick} color="#007bff" />
      
      <View style={ styles.button }>
        <Button style={styles.buttonText} title="Update Product" onPress={handleSubmit} color="green" />
      </View> 
      
    </View>
    

    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
     paddingBottom: 40,
      paddingHorizontal: 16 
    },

  label: {
    marginTop: 12,
     fontWeight: '600',
      fontSize: 16
  },

  input: {
     borderWidth: 1,
      borderColor: '#ccc',
       borderRadius: 10,
    paddingHorizontal: 12,
     paddingVertical: 10,
      fontSize: 16, marginTop: 6,
  },
  pickerContainer: {
    borderWidth: 1,
     borderColor: '#ccc',
      borderRadius: 10, 
      marginTop: 6,
  },

imagePicker: {
    marginTop: 10,
     padding: 12,
      backgroundColor: '#f0f0f0',
    borderRadius: 10,
     alignItems: 'center', 
     flex: 1, marginHorizontal: 4,
  },

  imagePickerText: { color: '#333' },
  imageWrapper: {
    position: 'relative',
    marginRight: 10,
    marginBottom: 10,
  },

  button: {
    marginTop: 20, backgroundColor: '#007bff',
    paddingVertical: 14, borderRadius: 10, alignItems: 'center',
  },
buttonText: {
   color: '#fff',
    fontSize: 16,
     fontWeight: 'bold' },

  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
  },
  cross: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default EditProductForm;