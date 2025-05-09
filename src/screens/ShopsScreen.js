import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ShopsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <Text style={styles.subtext}></Text>
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
