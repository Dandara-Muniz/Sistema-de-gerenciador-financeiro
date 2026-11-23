import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },
  header: {
    backgroundColor: '#4A4A52',
    width: '100%',
    height: 60,
  },
  footer: {
    height: 60,
    backgroundColor: '#4A4A52',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    flexDirection: 'column',
    gap: 14,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontFamily: 'serif',
  },
  label: {
    fontSize: 18,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#C7F2A7',
    borderRadius: 6,
    height: 40,
  },
  button: {
    backgroundColor: '#C7F2A7',
    paddingVertical: 10,
    paddingHorizontal: 45,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default styles;
