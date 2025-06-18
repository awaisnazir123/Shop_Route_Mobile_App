import React from 'react';
import { View, StyleSheet } from 'react-native';
import EditUserForm from '../components/EditUserForm';
import { styles } from '../styles/editUserScreen.style';
export default function EditUserScreen({ route }) {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <EditUserForm user={user} />
    </View>
  );
}


