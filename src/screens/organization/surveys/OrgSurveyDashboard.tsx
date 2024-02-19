import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {surveyStyles} from '../../../styles/surveyStyles';
import Icon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../../constants/colors';
import moment from 'moment';
import MonthView from './helpers/MonthView';
const OrgSurveyDashboard = () => {
  const [monthIndex, setMonthIndex] = useState(0);
  const submittedSurveys = [
    {
      date: '2024-01-01T00:00:00.000Z',
      surveyDetails: {
        _id: '65963cc0bfd0f8d9f8c65e58',
        organisationId: '6592c65302082856df0e51e2',
        month: 1,
        year: 2024,
        offsetContributed: 100,
        totalCarbonEmitted: 262.46,
        date: '2024-01-01T00:00:00.000Z',
        createdAt: '2024-01-04T05:06:08.967Z',
        updatedAt: '2024-02-15T15:32:34.500Z',
        __v: 0,
        transport: {
          month: 1,
          year: 2024,
          carbonEmission: 78.03,
          trip: [
            {
              vehicle: '65943d6004a255abf16c91ac',
              vehicle_name: 'Ashok Leyland Viking',
              distance: 12,
              no_of_people: 2,
              carbonEmitted: 78.03200000000001,
              _id: '65ce1927dd34ad0e1b542a4f',
            },
          ],
          _id: '65ce1927dd34ad0e1b542a4e',
        },
        machinery: {
          month: 1,
          year: 2024,
          carbonEmission: 79.2,
          machines: [
            {
              machine_id: '6592ce7b02082856df0e5ad8',
              machine_name: 'Bull dozer',
              fuelEfficiency: 12,
              hoursinMonth: 2,
              carbonEmitted: 79.19999999999999,
              _id: '65ce1942dd34ad0e1b542a81',
            },
          ],
          _id: '65ce1942dd34ad0e1b542a80',
        },
        electricity: {
          carbonEmission: 104.55,
          unitsConsumed: 123,
          _id: '65ce1952dd34ad0e1b542ab3',
        },
        utility: {
          month: 1,
          year: 2024,
          paper: {
            paperReams: 0,
            carbonEmittedByPaper: 0,
            _id: '65ce2e92dd34ad0e1b542af9',
          },
          paperCup: {
            type: 'Recycled',
            paperCupBundles: 2,
            carbonEmittedByPaperCup: 0.38,
            _id: '65ce2e92dd34ad0e1b542afa',
          },
          plasticCup: {
            plasticCupBundles: 0,
            carbonEmittedByPlasticCup: 0,
            _id: '65ce2e92dd34ad0e1b542afb',
          },
          tissue: {
            tissueType: 'Recycled',
            tissueBundles: 2,
            carbonEmittedTissue: 0.3,
            _id: '65ce2e92dd34ad0e1b542afc',
          },
          carbonEmission: 0.6799999999999999,
          _id: '65ce2e92dd34ad0e1b542af8',
        },
      },
    },
    {
      date: '2024-02-01T00:00:00.000Z',
      surveyDetails: {
        _id: '65963cc0bfd0f8d9f8c65e58',
        organisationId: '6592c65302082856df0e51e2',
        month: 1,
        year: 2024,
        offsetContributed: 100,
        totalCarbonEmitted: 262.46,
        date: '2024-01-01T00:00:00.000Z',
        createdAt: '2024-01-04T05:06:08.967Z',
        updatedAt: '2024-02-15T15:32:34.500Z',
        __v: 0,
        transport: {
          month: 1,
          year: 2024,
          carbonEmission: 78.03,
          trip: [
            {
              vehicle: '65943d6004a255abf16c91ac',
              vehicle_name: 'Ashok Leyland Viking',
              distance: 12,
              no_of_people: 2,
              carbonEmitted: 78.03200000000001,
              _id: '65ce1927dd34ad0e1b542a4f',
            },
          ],
          _id: '65ce1927dd34ad0e1b542a4e',
        },
        machinery: {
          month: 1,
          year: 2024,
          carbonEmission: 79.2,
          machines: [
            {
              machine_id: '6592ce7b02082856df0e5ad8',
              machine_name: 'Bull dozer',
              fuelEfficiency: 12,
              hoursinMonth: 2,
              carbonEmitted: 79.19999999999999,
              _id: '65ce1942dd34ad0e1b542a81',
            },
          ],
          _id: '65ce1942dd34ad0e1b542a80',
        },
        electricity: {
          carbonEmission: 104.55,
          unitsConsumed: 123,
          _id: '65ce1952dd34ad0e1b542ab3',
        },
        utility: {
          month: 1,
          year: 2024,
          paper: {
            paperReams: 0,
            carbonEmittedByPaper: 0,
            _id: '65ce2e92dd34ad0e1b542af9',
          },
          paperCup: {
            type: 'Recycled',
            paperCupBundles: 2,
            carbonEmittedByPaperCup: 0.38,
            _id: '65ce2e92dd34ad0e1b542afa',
          },
          plasticCup: {
            plasticCupBundles: 0,
            carbonEmittedByPlasticCup: 0,
            _id: '65ce2e92dd34ad0e1b542afb',
          },
          tissue: {
            tissueType: 'Recycled',
            tissueBundles: 2,
            carbonEmittedTissue: 0.3,
            _id: '65ce2e92dd34ad0e1b542afc',
          },
          carbonEmission: 0.6799999999999999,
          _id: '65ce2e92dd34ad0e1b542af8',
        },
      },
    },
  ];

  const increaseIndex = () => {
    if (monthIndex === submittedSurveys.length - 1) {
      return setMonthIndex(0);
    }
    setMonthIndex(curIndex => curIndex + 1);
  };
  const decreaseIndex = () => {
    if (monthIndex === 0) {
      return setMonthIndex(submittedSurveys.length - 1);
    }
    setMonthIndex(curIndex => curIndex - 1);
  };
  return (
    <View style={surveyStyles.surveyContainer}>
      <View style={surveyStyles.surveyHeader}>
        <Icon name="arrowleft" size={22} color={COLORS.black} />
        <Text style={surveyStyles.headerText}>Survey Info</Text>
      </View>

      <View style={surveyStyles.surveyContent}>
        <View style={[surveyStyles.row]}>
          <Text>
            {moment(submittedSurveys[monthIndex].date).format('MMMM YYYY')}
          </Text>
          <View style={[surveyStyles.row]}>
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
            <Text style={[surveyStyles.lightText, surveyStyles.centeredText]}>
              Transport
            </Text>
            <Text style={surveyStyles.centeredText}>
              {
                submittedSurveys[monthIndex].surveyDetails.transport
                  .carbonEmission
              }
              kg
            </Text>
          </View>
          <View style={surveyStyles.emissionTile}>
            <Text style={[surveyStyles.lightText, surveyStyles.centeredText]}>
              Machinary
            </Text>
            <Text style={surveyStyles.centeredText}>
              {
                submittedSurveys[monthIndex].surveyDetails.machinery
                  .carbonEmission
              }
              kg
            </Text>
          </View>
          <View style={surveyStyles.emissionTile}>
            <Text style={[surveyStyles.lightText, surveyStyles.centeredText]}>
              Electricity
            </Text>
            <Text style={surveyStyles.centeredText}>
              {
                submittedSurveys[monthIndex].surveyDetails.electricity
                  .carbonEmission
              }
              kg
            </Text>
            <Text style={[surveyStyles.smallText, surveyStyles.centeredText]}>
              {
                submittedSurveys[monthIndex].surveyDetails.electricity
                  .unitsConsumed
              }{' '}
              KWh
            </Text>
          </View>
          <View style={surveyStyles.emissionTile}>
            <Text style={[surveyStyles.lightText, surveyStyles.centeredText]}>
              Utilities
            </Text>
            <Text style={surveyStyles.centeredText}>
              {submittedSurveys[
                monthIndex
              ].surveyDetails.utility.carbonEmission.toFixed(2)}
              kg
            </Text>
          </View>
        </View>

        <View style={surveyStyles.row}>
          <Text style={[surveyStyles.largeText]}>Submitted Surveys</Text>
          <Text style={surveyStyles.boldText}>
            {moment(submittedSurveys[monthIndex].date).format('YYYY')}
          </Text>
        </View>
        <MonthView
          availableMonths={submittedSurveys.map((curObj: any) =>
            moment(curObj.date).format('MMM'),
          )}
        />
      </View>
    </View>
  );
};

export default OrgSurveyDashboard;

const styles = StyleSheet.create({});
