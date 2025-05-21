import React from 'react';
import { View, StyleSheet } from 'react-native';
import EditAreaForm from '../components/EditAreaForm';
import {styles} from '../styles/editAreaScreen.style'
const EditAreaScreen = ({ route }) => {
  const { area } = route.params;

  return (
    <View style={styles.container}>
      <EditAreaForm area={area} />
    </View>
  );
};



export default EditAreaScreen;
