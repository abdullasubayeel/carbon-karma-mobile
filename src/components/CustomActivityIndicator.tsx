import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';

type CustomActivityIndicatorProps = {
  message: string;
  size: 'small' | 'large';
};
const CustomActivityIndicator = ({
  message,
  size,
}: CustomActivityIndicatorProps) => {
  return (
    <View style={styles.CAIContainer}>
      <ActivityIndicator
        color={COLORS.primaryColor}
        size={size}></ActivityIndicator>

      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default CustomActivityIndicator;

const styles = StyleSheet.create({
  CAIContainer: {
    height: Dimensions.get('screen').height * 0.9,
    width: Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  text: {
    fontWeight: '400',
    color: COLORS.black,
    textAlign: 'center',
    fontSize: 14,
  },
});
