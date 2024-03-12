import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import moment from 'moment';

type MonthViewProps = {
  year: string;
  dates: string[];
};
const MonthView = ({submittedSurveys, year, navigation}: any) => {
  const months = [
    {month: 'Jan', year},
    {month: 'Feb', year},
    {month: 'Mar', year},
    {month: 'Apr', year},
    {month: 'May', year},
    {month: 'Jun', year},
    {month: 'Jul', year},
    {month: 'Aug', year},
    {month: 'Sep', year},
    {month: 'Oct', year},
    {month: 'Nov', year},
    {month: 'Dec', year},
  ];

  const avlMonths = submittedSurveys?.map((obj: any) =>
    moment(obj.date).format('MMM/YYYY'),
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

    if (!Object.keys(curSurvey.surveyDetails).includes('transport')) {
      showAlert(monthName, 'Transport survey data is missing', 0);
      return;
    } else if (!Object.keys(curSurvey.surveyDetails).includes('machinery')) {
      showAlert(monthName, 'Machinary survey data is missing', 1);
      return;
    } else if (!Object.keys(curSurvey.surveyDetails).includes('electricity')) {
      showAlert(monthName, 'Electricity survey data is missing', 2);
      return;
    } else if (!Object.keys(curSurvey.surveyDetails).includes('utility')) {
      showAlert(monthName, 'Utility survey data is missing', 3);
      return;
    }

    navigation.navigate('OrgSurveysDetails', {date: curSurvey.date});
  };

  const surveyFormNavigate = (monthName: any, stepper: any) => {
    navigation.navigate('OrgSurveyForm', {
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
          onPress={() => detailsNavigate(month.month)}>
          <Text style={styles.monthText}>{month.month}</Text>
          <View
            style={[
              styles.dot,
              avlMonths.includes(`${month.month}/${year}`) && styles.activeDot,
            ]}
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

export default MonthView;
