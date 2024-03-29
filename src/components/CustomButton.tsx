import {
  ActivityIndicator,
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
    <TouchableOpacity
      disabled={props.isLoading}
      style={styles.buttonStyles}
      onPress={props.onPress}>
      {props.isLoading ? (
        <ActivityIndicator size={'small'} color={'#fff'} />
      ) : (
        <Text style={styles.title}>{props.title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonStyles: {
    backgroundColor: COLORS.primaryColor,

    marginVertical: 12,
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
