import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';

const CustomTextField = (props: any) => {
  return (
    <View style={styles.fieldContainer}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}

      <TextInput style={styles.field} {...props}></TextInput>
    </View>
  );
};

export default CustomTextField;

const styles = StyleSheet.create({
  fieldContainer: {
    padding: 4,
    width: '100%',
  },
  label: {
    fontSize: 14,

    color: COLORS.black,
    marginLeft: 4,
    marginBottom: 8,
  },
  field: {
    borderRadius: 8,
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    paddingHorizontal: 14,
  },
});
