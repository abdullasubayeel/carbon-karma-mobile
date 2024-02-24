import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {useGetOrgVouchersQuery} from '../../../api/endpoint/organizationEndpoint';
import AuthContext from '../../../context/AuthProvider';
import {globalStyles} from '../../../styles/global';
import {orgStyles} from '../../../styles/organizationStyles';
const arrow = require('../../../assets/images/arrow.png');

const VoucherLists = () => {
  const {auth} = useContext(AuthContext);
  const {data: voucher} = useGetOrgVouchersQuery(auth.ID);
  return (
    <ScrollView style={orgStyles.exploreContainer}>
      {voucher?.map(obj => (
        <View style={[globalStyles.card, {flexDirection: 'row'}]}>
          <Image
            source={{uri: obj.voucherImg}}
            width={80}
            height={80}
            style={orgStyles.offsetImage}
          />
          <View style={{flex: 1}}>
            <View style={[globalStyles.row, {alignItems: 'flex-start'}]}>
              <Text style={[globalStyles.title, {flex: 1}]}>
                {obj.voucherName}
              </Text>
              <Image
                source={arrow}
                style={{height: 20, width: 25}}
                resizeMode="contain"
              />
            </View>
            <Text style={globalStyles.lightText}>{obj.voucherDescription}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default VoucherLists;

const styles = StyleSheet.create({});
