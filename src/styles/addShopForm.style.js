  import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { paddingBottom: 40, paddingHorizontal: 16 },
  label: { marginTop: 12, fontWeight: '600', fontSize: 16 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, marginTop: 6,
  },
  pickerContainer: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10, marginTop: 6,
  },
  
  button: {
    marginTop: 20, backgroundColor: '#007bff',
    paddingVertical: 14, borderRadius: 10, alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  submitButton: {
  backgroundColor: '#2196F3',
  padding: 12,
  borderRadius: 8,
  marginTop: 20,
  alignItems: 'center',
},
submitButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},
});