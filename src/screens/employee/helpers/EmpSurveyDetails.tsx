import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';

import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/AntDesign';
import AuthContext from '../../../context/AuthProvider';
import CustomActivityIndicator from '../../../components/CustomActivityIndicator';
import {surveyStyles} from '../../../styles/surveyStyles';
import {useGetSurveysDetailsByDateQuery} from '../../../api/endpoint/empSurveyEndpoint';
import {COLORS} from '../../../constants/colors';

const electricity = require('../../../assets/images/electricity.png');
const transport = require('../../../assets/images/transport.png');
const houshold = require('../../../assets/images/household.png');

const EmpSurveyDetails = ({route, navigation}: any) => {
  const {auth} = useContext(AuthContext);

  const {date} = route.params;
  const formattedDate = moment(date).format('YYYY/MM/DD');
  const {data: surveyDetails, isLoading: isSurveyLoading} =
    useGetSurveysDetailsByDateQuery({
      empId: auth._id,
      date: formattedDate,
    });

  if (isSurveyLoading) {
    return (
      <CustomActivityIndicator size="large" message="Fetching survey data..." />
    );
  }
  return (
    <View style={surveyStyles.surveyContainer}>
      <View style={surveyStyles.surveyHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" size={22} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={surveyStyles.headerText}>
          {moment(date).format('MMMM YYYY')}
        </Text>
      </View>

      {surveyDetails && (
        <View style={[surveyStyles.surveyContent]}>
          {/* Electricity */}
          <View
            style={[surveyStyles.surveyDetailsCard, {flexDirection: 'column'}]}>
            <Text style={surveyStyles.largeText}>Electricity</Text>
            <Text style={[surveyStyles.boldText, {marginBottom: 20}]}>
              Total Emission:{' '}
              {surveyDetails[0]?.electricity.carbonEmission.toFixed(2)} kg
            </Text>
            <View>
              <Text style={surveyStyles.smallText}>
                Units Consumed: {surveyDetails[0].electricity.unitsConsumed} KWh
              </Text>
            </View>
            <Image source={electricity} style={surveyStyles.surveyImage} />
          </View>

          {/* Commutation */}
          {/* <View
            style={[surveyStyles.surveyDetailsCard, {flexDirection: 'column'}]}>
            <Text style={surveyStyles.largeText}>Utilities</Text>
            <Text style={[surveyStyles.boldText, {marginBottom: 20}]}>
              Total Emission:{' '}
              {surveyDetails[0]..carbonEmission.toFixed(2)} kg
            </Text>
            <View>
              <Text style={surveyStyles.smallText}>
                No. of Reams : {surveyDetails[0].utility.paper.paperReams}
              </Text>
              <Text style={surveyStyles.smallText}>
                {surveyDetails[0].utility.paperCup.type} Cups:{' '}
                {surveyDetails[0].utility.paperCup.paperCupBundles} x 30
              </Text>
              <Text style={surveyStyles.smallText}>
                Plastic Cups:{' '}
                {surveyDetails[0].utility.plasticCup.plasticCupBundles === 0
                  ? 0
                  : surveyDetails[0].utility.plasticCup.plasticCupBundles +
                    'x 30'}
              </Text>
              <Text style={surveyStyles.smallText}>
                {surveyDetails[0].utility.tissue.tissueType} Plys:{' '}
                {surveyDetails[0].utility.tissue.tissueBundles} x 50
              </Text>
            </View>
            <Image source={houshold} style={surveyStyles.surveyImage} />
          </View> */}

          {/* Household */}
          <View
            style={[surveyStyles.surveyDetailsCard, {flexDirection: 'column'}]}>
            <Text style={surveyStyles.largeText}>Household</Text>
            <Text style={[surveyStyles.boldText, {marginBottom: 20}]}>
              Total Emission:{' '}
              {(
                surveyDetails[0].household.kitchenEmission +
                surveyDetails[0].household.totalTripsEmission
              ).toFixed(2)}{' '}
              kg
            </Text>
            <View>
              <Text style={surveyStyles.smallText}>
                Kitchen Emission: {surveyDetails[0].household.kitchenEmission}{' '}
                kg
              </Text>
              <Text style={surveyStyles.smallText}>
                Trips Emission: {surveyDetails[0].household.totalTripsEmission}{' '}
                kg
              </Text>
            </View>

            <Image source={houshold} style={surveyStyles.surveyImage} />
          </View>
        </View>
      )}
    </View>
  );
};

export default EmpSurveyDetails;

const styles = StyleSheet.create({});
