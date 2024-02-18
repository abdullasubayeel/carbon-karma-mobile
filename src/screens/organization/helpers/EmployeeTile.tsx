import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constants/colors';
import {orgStyles} from '../../../styles/organizationStyles';
const logo = require('../../../assets/images/ck-illustration.png');
const leaf = require('../../../assets/images/leaf.png');
const emission = require('../../../assets/images/emission.png');

const EmployeeTile = ({
  _id,
  fullname,
  Phone,
  location,
  role,
  email,
  organisationID,
  karma_points,
  carbon_emission,
}: any) => {
  return (
    <View style={{paddingBottom: 2}}>
      <View style={styles.employeeTileContainer}>
        <Image style={styles.avatar} source={logo} />
        <Text>{fullname}</Text>
        <Text style={orgStyles.small}>{email}</Text>
        <View style={styles.pointsContainer}>
          <View style={styles.pointsTile}>
            <Image style={styles.iconStyles} source={leaf} />
            <Text style={orgStyles.small}>{karma_points} pts</Text>
          </View>
          <View style={styles.pointsTile}>
            <Image style={styles.iconStyles} source={emission} />
            <Text style={orgStyles.small}>{carbon_emission} kg</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EmployeeTile;

const styles = StyleSheet.create({
  employeeTileContainer: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    marginVertical: 8,
    elevation: 1,
    alignItems: 'center',
    maxWidth: 250,
  },
  avatar: {
    height: 64,
    width: 64,
    borderRadius: 48,
    elevation: 1,
    resizeMode: 'contain',
  },
  pointsContainer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  iconStyles: {
    height: 32,
    width: 32,
    resizeMode: 'contain',
  },
  pointsTile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
