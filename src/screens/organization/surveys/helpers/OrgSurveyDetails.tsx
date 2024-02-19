import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import AuthContext from '../../../../context/AuthProvider';
import {useGetSurveysDetailsByDateQuery} from '../../../../api/endpoint/orgSurveyEndpoint';
import moment from 'moment';
import CustomActivityIndicator from '../../../../components/CustomActivityIndicator';
import {surveyStyles} from '../../../../styles/surveyStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS} from '../../../../constants/colors';
import Icon from 'react-native-vector-icons/AntDesign';

const electricity = require('../../../../assets/images/electricity.png');
const transport = require('../../../../assets/images/transport.png');
const machine = require('../../../../assets/images/machinaries.png');
const utilities = require('../../../../assets/images/utilities.png');

const OrgSurveyDetails = ({route, navigation}: any) => {
  const {auth} = useContext(AuthContext);

  const {date} = route.params;
  const formattedDate = moment(date).format('YYYY/MM/DD');
  const {data: surveyDetails, isLoading: isSurveyLoading} =
    useGetSurveysDetailsByDateQuery({
      orgId: auth.ID,
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

      <View style={[surveyStyles.surveyContent]}>
        <View
          style={[surveyStyles.surveyDetailsCard, {flexDirection: 'column'}]}>
          <Text style={surveyStyles.largeText}>Electricity</Text>
          <Text style={[surveyStyles.boldText, {marginBottom: 20}]}>
            Total Emission:{' '}
            {surveyDetails[0].electricity.carbonEmission.toFixed(2)} kg
          </Text>
          <View>
            <Text style={surveyStyles.smallText}>
              Units Consumed: {surveyDetails[0].electricity.unitsConsumed} KWh
            </Text>
          </View>
          <Image source={electricity} style={surveyStyles.surveyImage} />
        </View>

        {/* Utilities */}
        <View
          style={[surveyStyles.surveyDetailsCard, {flexDirection: 'column'}]}>
          <Text style={surveyStyles.largeText}>Utilities</Text>
          <Text style={[surveyStyles.boldText, {marginBottom: 20}]}>
            Total Emission: {surveyDetails[0].utility.carbonEmission.toFixed(2)}{' '}
            kg
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
          <Image source={utilities} style={surveyStyles.surveyImage} />
        </View>

        {/* Machine */}
        <View
          style={[surveyStyles.surveyDetailsCard, {flexDirection: 'column'}]}>
          <Text style={surveyStyles.largeText}>Machinaries</Text>
          <Text style={[surveyStyles.boldText, {marginBottom: 20}]}>
            Total Emission:{' '}
            {surveyDetails[0].machinery.carbonEmission.toFixed(2)} kg
          </Text>
          <View>
            {surveyDetails[0].machinery.machines.map((obj: any, i: number) => (
              <Text style={surveyStyles.smallText}>
                {i + 1}. {obj.machine_name} : {obj.carbonEmitted.toFixed(2)} kg
              </Text>
            ))}
          </View>
          <Image source={machine} style={surveyStyles.surveyImage} />
        </View>
        <View
          style={[surveyStyles.surveyDetailsCard, {flexDirection: 'column'}]}>
          <Text style={surveyStyles.largeText}>Transport</Text>
          <Text style={[surveyStyles.boldText, {marginBottom: 20}]}>
            Total Emission:{' '}
            {surveyDetails[0].transport.carbonEmission.toFixed(2)} kg
          </Text>
          <View>
            {surveyDetails[0].transport.trip.map((obj: any, i: number) => (
              <Text style={surveyStyles.smallText}>
                {i + 1}. {obj.vehicle_name} : {obj.carbonEmitted.toFixed(2)} kg
              </Text>
            ))}
          </View>

          <Image source={transport} style={surveyStyles.surveyImage} />
        </View>
      </View>
    </View>
  );
};

export default OrgSurveyDetails;

const styles = StyleSheet.create({});
