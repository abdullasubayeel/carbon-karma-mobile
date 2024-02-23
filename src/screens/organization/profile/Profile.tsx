import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {orgStyles} from '../../../styles/organizationStyles';
import {globalStyles} from '../../../styles/global';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../constants/colors';
import {
  useGetEmployeeProfileQuery,
  useGetOrgProfileQuery,
} from '../../../api/endpoint/organizationEndpoint';
import AuthContext from '../../../context/AuthProvider';
import CustomActivityIndicator from '../../../components/CustomActivityIndicator';

const emission = require('../../../assets/images/emission.png');
const leaf = require('../../../assets/images/leaf.png');
// const emission = require('../../../assets/images/emission.png');
const Profile = ({navigation}: any) => {
  const {auth} = useContext(AuthContext);
  const {data: profileData, isLoading: isEmpProfileLoading} =
    useGetEmployeeProfileQuery(auth._id);
  const {data: orgData, isLoading: isOrgProfileLoading} = useGetOrgProfileQuery(
    auth.ID,
  );

  const updateNavigate = () => {
    navigation.navigate('Update Profile', {profileData});
  };

  if (isOrgProfileLoading || isEmpProfileLoading) {
    return (
      <CustomActivityIndicator
        message={'Getting your Profile info...'}
        size="large"
      />
    );
  }
  return (
    <View style={orgStyles.profileBody}>
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
                {profileData?.carbon_emission} kg
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Image source={leaf} style={orgStyles.imageIcon} />
              <Text style={[orgStyles.nameText, {textAlign: 'center'}]}>
                {profileData?.karma_points} pts
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={globalStyles.card}>
        <Text style={orgStyles.nameText}>Organisation</Text>
        <Text style={orgStyles.title}>{orgData?.organisationName}</Text>
        <Text style={orgStyles.small}>{orgData?.address}</Text>
        <Text style={orgStyles.small}>{orgData?.sector}</Text>

        {/* <TouchableOpacity>
          <Icon name="setting" color={COLORS.primaryColor} size={24} />
        </TouchableOpacity> */}
        <Image
          source={{uri: orgData?.logo}}
          style={orgStyles.orgImage}
          resizeMode="contain"></Image>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
