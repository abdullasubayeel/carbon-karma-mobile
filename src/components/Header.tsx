import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';

const Header = ({heading}: any) => {
  return (
    <View style={styles.bg}>
      <Text style={styles.text}>{heading}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: COLORS.white,
    padding: 20,
  },

  text: {
    fontSize: 20,
    fontWeight: '500',
    color: '#222',
  },
});
