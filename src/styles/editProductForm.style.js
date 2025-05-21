
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
     paddingBottom: 40,
      paddingHorizontal: 16 
    },

  label: {
    marginTop: 12,
     fontWeight: '600',
      fontSize: 16
  },

  input: {
     borderWidth: 1,
      borderColor: '#ccc',
       borderRadius: 10,
    paddingHorizontal: 12,
     paddingVertical: 10,
      fontSize: 16, marginTop: 6,
  },
  pickerContainer: {
    borderWidth: 1,
     borderColor: '#ccc',
      borderRadius: 10, 
      marginTop: 6,
  },

imagePicker: {
    marginTop: 10,
     padding: 12,
      backgroundColor: '#f0f0f0',
    borderRadius: 10,
     alignItems: 'center', 
     flex: 1, marginHorizontal: 4,
  },

  imagePickerText: { color: '#333' },
  imageWrapper: {
    position: 'relative',
    marginRight: 10,
    marginBottom: 10,
  },

  button: {
    marginTop: 20, backgroundColor: '#007bff',
    paddingVertical: 14, borderRadius: 10, alignItems: 'center',
  },
buttonText: {
   color: '#fff',
    fontSize: 16,
     fontWeight: 'bold' },

  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
  },
  cross: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

