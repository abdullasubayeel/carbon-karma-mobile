import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';

type CustomActivityIndicatorProps = {
  message: string;
};
const CustomActivityIndicator = ({message}: CustomActivityIndicatorProps) => {
  return (
    <View>
      <ActivityIndicator
        color={COLORS.primaryColor}
        size={'small'}></ActivityIndicator>

      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default CustomActivityIndicator;

const styles = StyleSheet.create({
  text: {
    fontWeight: '400',
    color: COLORS.black,
    fontSize: 14,
  },
});
