import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {orgStyles} from '../../styles/organizationStyles';
import {globalStyles} from '../../styles/global';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../constants/colors';

import AuthContext from '../../context/AuthProvider';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';
import {useGetEmployeeProfileQuery} from '../../api/endpoint/organizationEndpoint';

const emission = require('../../assets/images/emission.png');
const leaf = require('../../assets/images/leaf.png');
// const emission = require('../../../assets/images/emission.png');
const EmpProfile = ({navigation}: any) => {
  const {auth} = useContext(AuthContext);
  console.log('-------------------', auth);
  const {data: profileData, isLoading: isEmpProfileLoading} =
    useGetEmployeeProfileQuery(auth._id);

  const updateNavigate = () => {
    navigation.navigate('Update Profile', {profileData});
  };

  if (isEmpProfileLoading) {
    return (
      <CustomActivityIndicator
        message={'Getting your Profile info...'}
        size="large"
      />
    );
  }
  return (
    <ScrollView style={orgStyles.profileBody}>
      <View style={globalStyles.card}>
        <View style={globalStyles.row}>
          <Text style={orgStyles.nameText}>Your Profile</Text>
          <TouchableOpacity onPress={updateNavigate}>
            <Icon name="edit" color={COLORS.primaryColor} size={24} />
          </TouchableOpacity>
        </View>
        <Image
          source={{uri: profileData?.profile}}
          style={orgStyles.avatar}
          resizeMode="contain"></Image>

        <View style={orgStyles.profileText}>
          <Text style={[orgStyles.nameText, {textAlign: 'center'}]}>
            {profileData?.fullname}
          </Text>
          <Text style={[orgStyles.small, {textAlign: 'center'}]}>
            {profileData?.email}
          </Text>
          <View
            style={[
              globalStyles.row,
              {
                paddingHorizontal: 24,
                marginVertical: 12,
                justifyContent: 'space-evenly',
              },
            ]}>
            <View style={{alignItems: 'center'}}>
              <Image source={emission} style={orgStyles.imageIcon} />
              <Text style={[orgStyles.nameText, {textAlign: 'center'}]}>
                {profileData?.carbon_emission.toFixed(2)} kg
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Image source={leaf} style={orgStyles.imageIcon} />
              <Text style={[orgStyles.nameText, {textAlign: 'center'}]}>
                {profileData?.karma_points.toFixed(2)} pts
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EmpProfile;

const styles = StyleSheet.create({});
