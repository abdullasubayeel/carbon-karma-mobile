import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {orgStyles} from '../../styles/organizationStyles';
import ExploreTile from './helpers/ExploreTile';
import IoniIcons from 'react-native-vector-icons/Ionicons';
import MateIcons from 'react-native-vector-icons/MaterialIcons';

const Explore = () => {
  const exploreData = [
    {
      iconName: <MateIcons name="money" size={24} color={'#222'} />,
      color: '#CCEAE0',
      navLink: 'offsets',
      title: 'Offsets',
    },
    {
      iconName: <MateIcons name="attach-money" size={24} color={'#222'} />,
      color: '#EBEBD1',
      navLink: 'vouchers',
      title: 'Vounchers',
    },
    {
      iconName: <MateIcons name="contact-support" size={24} color={'#222'} />,
      color: '#FEDBBB',
      navLink: 'offsets',
      title: 'Support',
    },
    {
      iconName: <IoniIcons name="settings-outline" size={24} color={'#222'} />,
      color: '#FDEFC7',
      navLink: 'offsets',
      title: 'Settings',
    },
  ];
  return (
    <View style={orgStyles.exploreContainer}>
      {exploreData.map(obj => (
        <ExploreTile {...obj} />
      ))}
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({});
