// EditShopScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import EditShopForm from '../components/EditShopForm';
import { styles } from '../styles/editShopScreen.style';

export default function EditShopScreen({ route, navigation }) {
  const { shop, onShopUpdated } = route.params;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Edit Shop</Text>
      <EditShopForm shop={shop} navigation={navigation} onShopUpdated={onShopUpdated} />
    </View>
  );
}
