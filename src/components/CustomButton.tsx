import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';

const CustomButton = (props: any) => {
  return (
    <TouchableOpacity style={styles.buttonStyles} onPress={props.onPress}>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonStyles: {
    backgroundColor: COLORS.primaryColor,

    paddingVertical: 12,
    minWidth: 150,
    borderRadius: 8,
    alignItems: 'center',
  },
  title: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '400',
  },
});
