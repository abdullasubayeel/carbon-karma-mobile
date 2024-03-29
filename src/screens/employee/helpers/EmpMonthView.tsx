import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';

import moment from 'moment';
import {COLORS} from '../../../constants/colors';

type MonthViewProps = {
  year: string;
  dates: string[];
};
const EmpMonthView = ({submittedSurveys, year, navigation}: any) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const avlMonths = submittedSurveys?.map((obj: any) =>
    moment(obj.date).format('MMM'),
  );

  function getElapsedMonthsList() {
    // Get the current date
    const currentDate = new Date();

    // Get the current month (0-indexed, so January is 0)
    const currentMonth = currentDate.getMonth();

    // Generate a list of elapsed months
    const elapsedMonthsList = [];
    for (let month = currentMonth - 1; month < 12; month++) {
      elapsedMonthsList.push(months[month]);
    }

    return elapsedMonthsList;
  }
  const elapsedMonths = getElapsedMonthsList();

  const detailsNavigate = (monthName: string) => {
    const curSurvey = submittedSurveys.find(
      (obj: any) =>
        moment(obj.date).format('MMM YYYY') === `${monthName} ${year}`,
    );

    if (!curSurvey) {
      return surveyFormNavigate(monthName, 0);
    }

    if (!Object.keys(curSurvey.surveyDetails).includes('trips')) {
      showAlert(monthName, 'Commutation survey data is missing', 0);
      return;
    } else if (!Object.keys(curSurvey.surveyDetails).includes('electricity')) {
      showAlert(monthName, 'Electricity survey data is missing', 1);
      return;
    } else if (!Object.keys(curSurvey.surveyDetails).includes('household')) {
      showAlert(monthName, 'Household survey data is missing', 2);
      return;
    }

    navigation.navigate('EmpSurveysDetails', {date: curSurvey.date});
  };

  const surveyFormNavigate = (monthName: any, stepper: any) => {
    navigation.navigate('EmpSurveyForm', {
      monthName: monthName,
      year,
      stepper: stepper,
    });
  };

  const showAlert = (monthName: any, message: any, stepper: number) =>
    Alert.alert(
      message,
      'Would you like to add Survey for this given data?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => surveyFormNavigate(monthName, stepper),
          style: 'default',
        },
      ],
      {
        cancelable: true,
      },
    );
  return (
    <View style={styles.container}>
      {months.map((month, index) => (
        <TouchableOpacity
          key={index}
          style={styles.monthContainer}
          onPress={() => detailsNavigate(month)}>
          <Text style={styles.monthText}>{month}</Text>
          <View
            style={[styles.dot, avlMonths.includes(month) && styles.activeDot]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    gap: 12,
  },
  monthContainer: {
    alignItems: 'center',
    padding: 14,
  },
  monthText: {
    fontSize: 14,
    marginBottom: 5,
    color: COLORS.black,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.grey,
  },
  activeDot: {
    backgroundColor: COLORS.primaryColor,
  },
});

export default EmpMonthView;
