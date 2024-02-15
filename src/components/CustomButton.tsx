import {Button, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';

const CustomButton = (props: any) => {
  return (
    <Pressable style={styles.buttonStyles} onPress={props.onPress}>
      <Text style={styles.title}>{props.title}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonStyles: {
    backgroundColor: COLORS.primaryColor,

    paddingVertical: 12,

    borderRadius: 12,
    alignItems: 'center',
  },
  title: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '400',
  },
});
