import React from 'react';
import { View, Text } from 'react-native';
import AddShopForm from '../components/AddShopForm';
import { styles } from '../styles/addShopScreen.style';
import { useNavigation } from '@react-navigation/native';

export default function AddShopScreen() {
   const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Shop</Text>
      <AddShopForm navigation={navigation}/>
    </View>
  );
}
