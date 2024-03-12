import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {surveyStyles} from '../../../styles/surveyStyles';
import Icon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../../constants/colors';
import moment from 'moment';
import MonthView from './helpers/MonthView';
import {useGetSubmittedSurveysQuery} from '../../../api/endpoint/orgSurveyEndpoint';
import AuthContext from '../../../context/AuthProvider';
import CustomActivityIndicator from '../../../components/CustomActivityIndicator';
import {globalStyles} from '../../../styles/global';
const OrgSurveyDashboard = ({navigation}: any) => {
  const {auth} = useContext(AuthContext);
  const [monthIndex, setMonthIndex] = useState(0);
  const {data: submittedSurveys, isLoading: isSurveyLoading} =
    useGetSubmittedSurveysQuery(auth.ID);

  const increaseIndex = () => {
    if (monthIndex === submittedSurveys?.orgSurveys.length - 1) {
      return setMonthIndex(0);
    }
    setMonthIndex(curIndex => curIndex + 1);
  };
  const decreaseIndex = () => {
    if (monthIndex === 0) {
      return setMonthIndex(submittedSurveys?.orgSurveys.length - 1);
    }
    setMonthIndex(curIndex => curIndex - 1);
  };
  console.log('org survey', submittedSurveys?.orgSurveys);
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
        {submittedSurveys?.orgSurveys.length !== 0 && (
          <>
            <View style={[globalStyles.row]}>
              <Text>
                {moment(submittedSurveys?.orgSurveys[monthIndex]?.date).format(
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
                  Transport
                </Text>
                <Text style={surveyStyles.centeredText}>
                  {submittedSurveys?.orgSurveys[monthIndex]?.surveyDetails
                    .transport?.carbonEmission ?? 0}
                  kg
                </Text>
              </View>
              <View style={surveyStyles.emissionTile}>
                <Text
                  style={[surveyStyles.lightText, surveyStyles.centeredText]}>
                  Machinary
                </Text>
                <Text style={surveyStyles.centeredText}>
                  {submittedSurveys?.orgSurveys[monthIndex]?.surveyDetails
                    ?.machinery?.carbonEmission ?? '0'}
                  kg
                </Text>
              </View>
              <View style={surveyStyles.emissionTile}>
                <Text
                  style={[surveyStyles.lightText, surveyStyles.centeredText]}>
                  Electricity
                </Text>
                <Text style={surveyStyles.centeredText}>
                  {submittedSurveys?.orgSurveys[monthIndex]?.surveyDetails
                    .electricity?.carbonEmission ?? '0'}
                  kg
                </Text>
                <Text
                  style={[surveyStyles.smallText, surveyStyles.centeredText]}>
                  {submittedSurveys?.orgSurveys[monthIndex]?.surveyDetails
                    .electricity?.unitsConsumed ?? '0'}{' '}
                  KWh
                </Text>
              </View>
              <View style={surveyStyles.emissionTile}>
                <Text
                  style={[surveyStyles.lightText, surveyStyles.centeredText]}>
                  Utilities
                </Text>
                <Text style={surveyStyles.centeredText}>
                  {submittedSurveys?.orgSurveys[
                    monthIndex
                  ]?.surveyDetails.utility?.carbonEmission.toFixed(2) ?? '0'}
                  kg
                </Text>
              </View>
            </View>
          </>
        )}
        <View style={globalStyles.row}>
          <Text style={[surveyStyles.largeText]}>Submitted Surveys</Text>
          <Text style={surveyStyles.largeText}>
            {moment(submittedSurveys?.orgSurveys[monthIndex]?.date).format(
              'YYYY',
            )}
          </Text>
        </View>
        <Text>Choose the month to submit/view the surveys</Text>
        <MonthView
          navigation={navigation}
          year={moment(submittedSurveys?.orgSurveys[monthIndex]?.date).format(
            'YYYY',
          )}
          submittedSurveys={submittedSurveys?.orgSurveys.map(
            (curObj: any) => curObj,
          )}
        />
      </View>
    </View>
  );
};

export default OrgSurveyDashboard;

const styles = StyleSheet.create({});
