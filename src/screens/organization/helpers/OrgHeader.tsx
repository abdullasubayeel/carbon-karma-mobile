import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {orgStyles} from '../../../styles/organizationStyles';
import Icons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../constants/colors';
const logo = require('../../../assets/images/ck-illustration.png');
const OrgHeader = () => {
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
        <View style={orgStyles.iconTile}>
          <Icons
            name="notifications-outline"
            size={24}
            color={COLORS.primaryColor}
          />
        </View>
        <View style={orgStyles.iconTile}>
          <Icons name="menu-outline" size={24} color={COLORS.primaryColor} />
        </View>
      </View>
    </View>
  );
};

export default OrgHeader;

const styles = StyleSheet.create({});
