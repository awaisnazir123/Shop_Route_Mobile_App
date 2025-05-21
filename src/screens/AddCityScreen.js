import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AddCityForm from '../components/AddCityForm';
import {styles} from '../styles/addCityScreen.style'
export default function AddCityScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New City</Text>
      <AddCityForm />
    </ScrollView>
  );
}


