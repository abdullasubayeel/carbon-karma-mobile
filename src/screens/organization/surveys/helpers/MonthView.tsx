import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import moment from 'moment';

type MonthViewProps = {
  year: string;
  dates: string[];
};
const MonthView = ({dates, year, navigation}: any) => {
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

  const avlMonths = dates.map((date: any) => moment(date).format('MMM'));

  const detailsNavigate = (date: string) => {
    const curDate = dates.find(
      (obj: any) => moment(obj).format('MMM YYYY') === `${date} ${year}`,
    );

    if (!curDate) {
      return ToastAndroid.show(
        'No Survey Data on given date',
        ToastAndroid.SHORT,
      );
    }
    navigation.navigate('OrgSurveysDetails', {date: curDate});
  };
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

export default MonthView;
