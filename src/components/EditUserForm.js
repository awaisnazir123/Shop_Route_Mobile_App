import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../utils/urlConfig';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/editUserForm.style';
export default function EditUserForm({ user }) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
const [role, setRole] = useState(user.role || 'Salesman'); // Default: Salesman
 const [isAccess, setIsAccess] = useState(user.isAccess || 'Unblock');
 const [isBlocked, setIsBlocked] = useState(user.isBlocked || 'Unblock');
const navigation = useNavigation();

  const handleUpdate = async () => {
  try {
    const updatedUser = {
      username,
      email,
      role, // 👈 Send role to backend
      isAccess,
      isBlocked,
    };

    await axios.put(`${BASE_URL}/api/user/${user._id}`, updatedUser);

    Alert.alert('Success', 'User updated successfully');
    navigation.goBack();
  } catch (error) {
    console.error('Error updating user:', error);
    Alert.alert('Error', 'Failed to update user');
  }
};


  return (
     <ScrollView contentContainerStyle={{ padding: 16 }}>
    <View>
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

<View style={{ marginVertical: 10 }}>
  <Text style={{ marginBottom: 4, marginBottom: 4,fontWeight: 'bold' }}>Select Role:</Text>
  <View style={{ borderWidth: 1, borderRadius: 6, borderColor: '#ccc' }}>
    <Picker
      selectedValue={role}
      onValueChange={(itemValue) => setRole(itemValue)}
    >
      <Picker.Item label="Admin" value="Admin" />
      <Picker.Item label="Salesman" value="Salesman" />
    </Picker>
  </View>
</View>

<View style={{ marginVertical: 10 }}>
  <Text style={{ marginBottom: 4, marginBottom: 4,fontWeight: 'bold', }} >Access:</Text>
  <View style={{ borderWidth: 1, borderRadius: 6, borderColor: '#ccc' }}>
    <Picker
      selectedValue={isAccess}
      onValueChange={(itemValue) => setIsAccess(itemValue)}
    >
      <Picker.Item label="Unblock" value="false" />
      <Picker.Item label="Block" value="true" />
    </Picker>
  </View>
</View>

<View style={{ marginVertical: 10 }}>
  <Text style={{ marginBottom: 4,marginBottom: 4,fontWeight: 'bold' }}>Block:</Text>
  <View style={{ borderWidth: 1, borderRadius: 6, borderColor: '#ccc' }}>
    <Picker
      selectedValue={isBlocked}
      onValueChange={(itemValue) => setIsBlocked(itemValue)}
    >
      <Picker.Item label="Unblock" value="false" />
      <Picker.Item label="Block" value="true" />
    </Picker>
  </View>
</View>

     <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
  <Text style={styles.buttonText}>Update User</Text>
</TouchableOpacity>

    </View>
    </ScrollView>
  );
}

