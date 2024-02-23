import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {COLORS} from '../constants/colors';

const CustomSelect = ({
  setSelectedValue,
  selectedValue,
  placeholder,
  options,
  label,
}: any) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <RNPickerSelect
        placeholder={placeholder}
        items={options}
        onValueChange={(value: any) => setSelectedValue(value)}
        value={selectedValue}
        style={{
          viewContainer: styles.field,
          placeholder: styles.placeholder,
        }}
      />
      {selectedValue && <Text>Selected: {selectedValue}</Text>}
    </View>
  );
};

export default CustomSelect;

const styles = StyleSheet.create({
  fieldContainer: {
    padding: 4,
  },
  label: {
    fontSize: 14,

    color: COLORS.black,
    marginLeft: 4,
    marginBottom: 8,
  },
  field: {
    borderRadius: 12,
    borderColor: COLORS.borderColor,
    borderWidth: 1,
  },
  placeholder: {
    color: COLORS.borderColor,
    fontSize: 8,
  },
});
