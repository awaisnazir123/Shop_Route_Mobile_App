import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Button, Card, IconButton } from 'react-native-paper';

const ProductCard = ({ product, quantity, onQuantityChange, onAdd }) => {
  return (
    <Card style={{ margin: 8, width: '45%' }}>
      <Card.Content style={{ alignItems: 'center' }}>
        <Image
         source={{ uri: product.images?.[0] }}
          style={{ width: 80, height: 80, marginBottom: 8 }}
        />
        <Text style={{ fontWeight: 'bold', fontSize: 14, textAlign: 'center' }}>
          {product.name}
        </Text>
        <Text style={{ fontSize: 12, marginBottom: 8 }}>
          Price: {product.price}
        </Text>
       <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
  <TouchableOpacity
    onPress={() => onQuantityChange(product._id, Math.max(0, quantity - 1))}
    style={{
      backgroundColor: '#ddd',
      borderRadius: 20,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>–</Text>
  </TouchableOpacity>

  <Text style={{ fontSize: 16, marginHorizontal: 12 }}>{quantity}</Text>

  <TouchableOpacity
    onPress={() => onQuantityChange(product._id, Math.min(quantity + 1, 5))}
    style={{
      backgroundColor: '#ddd',
      borderRadius: 20,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>+</Text>
  </TouchableOpacity>
</View>


        <Button
          mode="contained"
          onPress={() => onAdd(product._id)}
          disabled={quantity === 0}
          style={{ backgroundColor: '#007bff' }}
        >
          Add
        </Button>
      </Card.Content>
    </Card>
  );
};

export default ProductCard;
