import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AddAreaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Area</Text>
      <Text style={styles.subtext}>This is where you will add a new area.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: '#666',
  },
});
