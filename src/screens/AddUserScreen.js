import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AddUserForm from '../components/AddUserForm';
import {styles} from '../styles/addUserScreen.style';
export default function AddUserScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New User</Text>
      <AddUserForm />
    </ScrollView>
  );
}


