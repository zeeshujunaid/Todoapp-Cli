// components/PriorityPicker.js
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import getPriorityStyles from '../helper/prioritystyle';
import { ThemeContext } from '../Theme/themecontext';

export default function PriorityPicker({ priority, setPriority }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <View style={[styles.dropdown, { backgroundColor: getPriorityStyles(priority) }]}>
      <Picker
        selectedValue={priority}
        onValueChange={setPriority}
        style={[styles.picker, { color: isDark ? '#fff' : '#000' }]}
        dropdownIconColor={isDark ? '#fff' : '#000'}
      >
        <Picker.Item label="Low" value="Low" />
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="High" value="High" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});
