import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {orgStyles} from '../../../styles/organizationStyles';
import Icons from 'react-native-vector-icons/Ionicons';
import MIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../../constants/colors';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {removeAsyncData} from '../../../utilities/asyncStorage';
import {logoutAction} from '../../../api/auth/authSlice';
export type RootStackParamList = {
  Notifications: {id: number} | undefined;
  Login: {} | undefined;
};

const logo = require('../../../assets/images/ck-illustration.png');

const OrgHeader = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const navigateToNotification = () => {
    navigation.navigate('Notifications');
  };

  const handleLogout = async () => {
    await removeAsyncData('user');
    dispatch(logoutAction({}));
    navigation.navigate('Login');
  };
  return (
    <View style={orgStyles.headerContainer}>
      <View style={orgStyles.profileContainer}>
        <Image style={orgStyles.headerImage} source={logo} />
        <View>
          <Text style={orgStyles.greenText}>Good Morning,</Text>
          <Text style={orgStyles.nameText}>Subayeel</Text>
        </View>
      </View>

      <View style={orgStyles.iconContainer}>
        <TouchableOpacity
          style={orgStyles.iconTile}
          onPress={navigateToNotification}>
          <Icons
            name="notifications-outline"
            size={24}
            color={COLORS.primaryColor}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={orgStyles.iconTile}>
          <MIcons name="logout" size={20} color={COLORS.primaryColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrgHeader;

const styles = StyleSheet.create({});
