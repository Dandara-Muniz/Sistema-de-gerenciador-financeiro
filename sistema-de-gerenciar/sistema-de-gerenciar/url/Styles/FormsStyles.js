import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
    gap: 10,
    padding: 20,
    borderWidth: 2,
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#FDFFE8',
    fontSize: 12,
    fontWeight: 'bold',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dateRow: {
    flexDirection: 'row',
    gap: 10,
  },
  dateInput: {
    flex: 1,
    textAlign: 'center',
  },
  dateInputYear: {
    flex: 1.5,
    textAlign: 'center',
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  optionButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FDFFE8',
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#E3F8D3',
  },
  optionText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectButton: {
    backgroundColor: '#FDFFE8',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#FDFFE8',
    borderRadius: 4,
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dropdownItemSelected: {
    backgroundColor: '#E3F8D3',
  },
});

export default styles;
