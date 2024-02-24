import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {surveyStyles} from '../../../styles/surveyStyles';
import Icon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../../constants/colors';
import moment from 'moment';

import {useGetSubmittedSurveysQuery} from '../../../api/endpoint/orgSurveyEndpoint';
import AuthContext from '../../../context/AuthProvider';
import CustomActivityIndicator from '../../../components/CustomActivityIndicator';
import {globalStyles} from '../../../styles/global';
import MonthView from '../../organization/surveys/helpers/MonthView';

import EmpMonthView from '../helpers/EmpMonthView';
import {employeeStyles} from '../../../styles/employeeStyles';
import FaIcon from 'react-native-vector-icons/FontAwesome6';
import MiIcon from 'react-native-vector-icons/MaterialIcons';
import {useGetSubmittedEmpSurveysQuery} from '../../../api/endpoint/empSurveyEndpoint';
const EmpSurveyDashboard = ({navigation}: any) => {
  const {auth} = useContext(AuthContext);
  const [monthIndex, setMonthIndex] = useState(0);
  const {data: submittedSurveys, isLoading: isSurveyLoading} =
    useGetSubmittedEmpSurveysQuery(auth._id);

  const increaseIndex = () => {
    if (!submittedSurveys?.empSurveys) {
      return;
    }
    if (monthIndex === submittedSurveys?.empSurveys.length - 1) {
      return setMonthIndex(0);
    }
    setMonthIndex(curIndex => curIndex + 1);
  };
  const decreaseIndex = () => {
    if (!submittedSurveys?.empSurveys) {
      return;
    }
    if (monthIndex === 0) {
      return setMonthIndex(submittedSurveys?.empSurveys.length - 1);
    }
    setMonthIndex(curIndex => curIndex - 1);
  };

  if (isSurveyLoading) {
    return (
      <CustomActivityIndicator size="large" message="Fetching all surveys..." />
    );
  }

  return (
    <View style={surveyStyles.surveyContainer}>
      {/* <View style={surveyStyles.surveyHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" size={22} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={surveyStyles.headerText}>Survey Info</Text>
      </View> */}

      <View style={surveyStyles.surveyContent}>
        {submittedSurveys?.empSurveys.length !== 0 && (
          <>
            <View style={[globalStyles.row]}>
              <Text>
                {moment(submittedSurveys?.empSurveys[monthIndex]?.date).format(
                  'MMMM YYYY',
                )}
              </Text>
              <View style={[globalStyles.row]}>
                <TouchableOpacity
                  style={[surveyStyles.circleBtn]}
                  onPress={decreaseIndex}>
                  <MIcon
                    name="arrow-back-ios"
                    size={14}
                    color={COLORS.primaryColor}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[surveyStyles.circleBtn]}
                  onPress={increaseIndex}>
                  <MIcon
                    name="arrow-forward-ios"
                    size={14}
                    color={COLORS.primaryColor}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={surveyStyles.surveyDetailsCard}>
              <View style={surveyStyles.emissionTile}>
                <Text
                  style={[surveyStyles.lightText, surveyStyles.centeredText]}>
                  Commutation
                </Text>
                <Text style={surveyStyles.centeredText}>
                  {submittedSurveys?.empSurveys[
                    monthIndex
                  ]?.surveyDetails.carbonEmitted.toFixed(2)}
                  kg
                </Text>
              </View>

              <View style={surveyStyles.emissionTile}>
                <Text
                  style={[surveyStyles.lightText, surveyStyles.centeredText]}>
                  Electricity
                </Text>
                <Text style={surveyStyles.centeredText}>
                  {submittedSurveys?.empSurveys[monthIndex]?.surveyDetails
                    .electricity?.carbonEmission ?? '0'}
                  kg
                </Text>
                <Text
                  style={[surveyStyles.smallText, surveyStyles.centeredText]}>
                  {submittedSurveys?.empSurveys[monthIndex]?.surveyDetails
                    .electricity?.unitsConsumed ?? '0'}{' '}
                  KWh
                </Text>
              </View>
              <View style={surveyStyles.emissionTile}>
                <Text
                  style={[surveyStyles.lightText, surveyStyles.centeredText]}>
                  Household
                </Text>
                <Text style={surveyStyles.centeredText}>
                  {' '}
                  {submittedSurveys?.empSurveys[
                    monthIndex
                  ]?.surveyDetails.household?.kitchenEmission.toFixed(2) ??
                    '0'}{' '}
                  kg
                </Text>
              </View>
              <View style={surveyStyles.emissionTile}>
                <Text
                  style={[surveyStyles.lightText, surveyStyles.centeredText]}>
                  Trips
                </Text>
                <Text style={surveyStyles.centeredText}>
                  {submittedSurveys?.empSurveys[
                    monthIndex
                  ]?.surveyDetails.household?.totalTripsEmission.toFixed(2) ??
                    '0'}{' '}
                  kg
                </Text>
              </View>
            </View>
          </>
        )}
        <View style={globalStyles.row}>
          <Text style={[surveyStyles.largeText]}>Submitted Surveys</Text>
          <Text style={surveyStyles.boldText}>
            {moment(submittedSurveys?.empSurveys[monthIndex]?.date).format(
              'YYYY',
            )}
          </Text>
        </View>
        <Text>Choose the month to submit/view the surveys</Text>
        <EmpMonthView
          navigation={navigation}
          year="2024"
          submittedSurveys={submittedSurveys?.empSurveys.map(
            (curObj: any) => curObj,
          )}
        />
      </View>
    </View>
  );
};

export default EmpSurveyDashboard;

const styles = StyleSheet.create({});
