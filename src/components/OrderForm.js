import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/orders.style';

export default function OrderForm({ form, setForm }) {
  return (
    <View style={styles.form}>
      {/* Name */}
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          style={styles.inputControl}
          placeholder="Enter name"
          placeholderTextColor="#6b7280"
          value={form.name}
          onChangeText={(name) => setForm({ ...form, name })}
        />
      </View>

      {/* Email */}
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.inputControl}
          placeholder="abc@gmail.com"
          placeholderTextColor="#6b7280"
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={(email) => setForm({ ...form, email })}
        />
      </View>

      {/* City */}
      <View style={styles.input}>
        <Text style={styles.inputLabel}>City</Text>
        <TextInput
          style={styles.inputControl}
          placeholder="Enter city"
          placeholderTextColor="#6b7280"
          value={form.city}
          onChangeText={(city) => setForm({ ...form, city })}
        />
      </View>

      {/* Area */}
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Area</Text>
        <TextInput
          style={styles.inputControl}
          placeholder="Enter area"
          placeholderTextColor="#6b7280"
          value={form.area}
          onChangeText={(area) => setForm({ ...form, area })}
        />
      </View>

      {/* Shop */}
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Shop</Text>
        <TextInput
          style={styles.inputControl}
          placeholder="Enter shop name"
          placeholderTextColor="#6b7280"
          value={form.shop}
          onChangeText={(shop) => setForm({ ...form, shop })}
        />
      </View>

      {/* Quantity */}
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Quantity</Text>
        <TextInput
          style={styles.inputControl}
          placeholder="Enter quantity"
          placeholderTextColor="#6b7280"
          keyboardType="numeric"
          value={form.quantity}
          onChangeText={(quantity) => setForm({ ...form, quantity })}
        />
      </View>

      {/* Payment Method */}
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Payment Method</Text>
        <TextInput
          style={styles.inputControl}
          placeholder="e.g. Cash, Card"
          placeholderTextColor="#6b7280"
          value={form.paymentmethod}
          onChangeText={(paymentmethod) => setForm({ ...form, paymentmethod })}
        />
      </View>

      {/* Submit Button */}
      <View style={styles.formAction}>
        <TouchableOpacity onPress={() => console.log(form)}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Submit Order</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
