import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {useGetOrgOffsetsQuery} from '../../../api/endpoint/organizationEndpoint';
import AuthContext from '../../../context/AuthProvider';
import CustomActivityIndicator from '../../../components/CustomActivityIndicator';
import {orgStyles} from '../../../styles/organizationStyles';
import {globalStyles} from '../../../styles/global';

const arrow = require('../../../assets/images/arrow.png');

const OffsetLists = () => {
  const {auth} = useContext(AuthContext);
  const {data: offsets, isLoading: isOffsetLoading} = useGetOrgOffsetsQuery(
    auth.ID,
  );
  console.log(offsets);
  if (isOffsetLoading) {
    return (
      <CustomActivityIndicator message="Getting Offsets..." size="large" />
    );
  }
  return (
    <ScrollView style={orgStyles.exploreContainer}>
      {offsets?.result.map(obj => (
        <View style={[globalStyles.card, {flexDirection: 'row'}]}>
          <Image
            source={{uri: obj.image}}
            width={80}
            height={80}
            style={orgStyles.offsetImage}
          />
          <View style={{flex: 1}}>
            <View style={[globalStyles.row, {alignItems: 'flex-start'}]}>
              <Text style={[globalStyles.title, {flex: 1}]}>
                {obj.project_name}
              </Text>
              <Image
                source={arrow}
                style={{height: 20, width: 25}}
                resizeMode="contain"
              />
            </View>
            <Text style={globalStyles.lightText}>{obj.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default OffsetLists;

const styles = StyleSheet.create({});
