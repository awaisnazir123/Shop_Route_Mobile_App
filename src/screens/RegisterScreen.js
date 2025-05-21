// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import RegisterForm from '../components/RegisterForm'; // Importing the RegisterForm component
import { styles } from '../styles/register.style'; // Importing global styles

export default function RegisterScreen() {
  const [form, setForm] = useState({
    
    username: '',
    email: '',
    password: ''
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Create an account</Text>
        </View>

        {/* RegisterForm Component */}
        <RegisterForm form={form} setForm={setForm} />
      </View>
    </SafeAreaView>
  );
}
