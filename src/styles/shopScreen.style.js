import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    alignItems: 'center',
  },
  headerRow: {
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  cell: {
    width: 100,  // ✅ fix width to stop breaking
    fontSize: 14,
    color: '#555',
    paddingHorizontal: 5,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#333',
  },
  headerButton: {
  backgroundColor: '#007bff',
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 20,
  marginRight: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 3,
},
headerButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 14,
},

});