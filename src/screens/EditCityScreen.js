import React from 'react';
import { View, StyleSheet } from 'react-native';
import EditCityForm from '../components/EditCityForm';
import {styles} from '../styles/editCityScreen.style'

const EditCityScreen = ({ route }) => {
  const { city } = route.params;

  return (
    <View style={styles.container}>
      <EditCityForm city={city} />
    </View>
  );
};



export default EditCityScreen;
