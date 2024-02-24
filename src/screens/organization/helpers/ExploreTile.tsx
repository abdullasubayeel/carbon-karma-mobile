import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type ExploreTileTypes = {
  iconName: any;
  color: string;
  navLink: string;
  title: string;
};
type RootStackParamList = {};

const ExploreTile = ({iconName, color, navLink, title}: ExploreTileTypes) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <Pressable
      style={styles.tileContainer}
      onPress={() => navigation.navigate(navLink)}>
      <View style={[styles.iconContainer, {backgroundColor: color}]}>
        {iconName}
      </View>
      <Text style={styles.tileText}>{title}</Text>
    </Pressable>
  );
};

export default ExploreTile;

const styles = StyleSheet.create({
  tileContainer: {
    backgroundColor: COLORS.backgroundColor,
    borderRadius: 12,
    padding: 10,
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    // padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    height: 70,
    // width: 80,

    aspectRatio: 1 / 1,
  },
  tileText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '500',
  },
});
