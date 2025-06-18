const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10
  },
  button: {
    backgroundColor: '#eee',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    margin: 4
  },
  selectedButton: {
    backgroundColor: '#007bff'
  },
  buttonText: {
    color: '#333',
    fontWeight: '500'
  },
  selectedButtonText: {
    color: '#fff'
  },
  shopButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4
  },
  shopButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600'
  },
  error: {
    color: 'red',
    marginBottom: 10
  }
});