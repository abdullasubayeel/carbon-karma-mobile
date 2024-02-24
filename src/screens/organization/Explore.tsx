import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {orgStyles} from '../../styles/organizationStyles';
import ExploreTile from './helpers/ExploreTile';
import IoniIcons from 'react-native-vector-icons/Ionicons';
import MateIcons from 'react-native-vector-icons/MaterialIcons';
import FIcons from 'react-native-vector-icons/Feather';

const Explore = () => {
  const exploreData = [
    {
      iconName: <MateIcons name="money" size={24} color={'#222'} />,
      color: '#CCEAE0',
      navLink: 'OffsetList',
      title: 'Offsets',
    },
    // {
    //   iconName: <MateIcons name="money" size={24} color={'#222'} />,
    //   color: '#CCEAE0',
    //   navLink: 'OffsetHistory',
    //   title: 'Offset History',
    // },
    {
      iconName: <MateIcons name="attach-money" size={24} color={'#222'} />,
      color: '#EBEBD1',
      navLink: 'VoucherList',
      title: 'Vounchers',
    },
    {
      iconName: <FIcons name="bell" size={24} color={'#222'} />,
      color: '#FEDBBB',
      navLink: 'Notifications',
      title: 'Notifications',
    },
    {
      iconName: <MateIcons name="contact-support" size={24} color={'#222'} />,
      color: '#FEDBBB',
      navLink: 'Support',
      title: 'Support',
    },
    {
      iconName: <IoniIcons name="settings-outline" size={24} color={'#222'} />,
      color: '#FDEFC7',
      navLink: 'Settings',
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
