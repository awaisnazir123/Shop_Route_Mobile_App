  import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { paddingBottom: 40, paddingHorizontal: 16 },
  label: { marginTop: 20, fontWeight: '600', fontSize: 16 },
  input: {
    width:300, borderWidth: 1, borderColor: '#ccc', borderRadius: 10,
    paddingHorizontal: 15, paddingVertical: 10, fontSize: 16, marginTop: 5
    
  },
  pickerContainer: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10, marginTop: 6,
  },
  button: {
    marginTop: 20, backgroundColor: '#007bff',
    paddingVertical: 14, borderRadius: 10, alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

});