import React from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import {styles} from '../styles/addAreaScreen.style'
import AddAreaForm from '../components/AddAreaForm';

export default function AddAreaScreen() {
  return (
   <ScrollView 
   style={styles.container}
    contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Add New Area</Text>
      <AddAreaForm />
    </ScrollView>
  );
}


