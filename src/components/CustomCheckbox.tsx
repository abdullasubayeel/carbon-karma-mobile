import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import {COLORS} from '../constants/colors';

const CustomCheckbox = ({setRememberMe, rememberMe, title}: any) => {
  return (
    <View style={styles.cbContainer}>
      <CheckBox
        disabled={false}
        value={rememberMe}
        onValueChange={newValue => setRememberMe(newValue)}
        tintColors={{true: COLORS.primaryColor, false: COLORS.borderColor}}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
  cbContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  title: {
    fontWeight: '500',
    fontSize: 14,
  },
});
