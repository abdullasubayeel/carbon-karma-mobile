import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../../constants/colors';

type MonthViewProps = {
  availableMonths: string[];
};
const MonthView = ({availableMonths}: MonthViewProps) => {
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

  const dotStatus = {};

  return (
    <View style={styles.container}>
      {months.map((month, index) => (
        <TouchableOpacity key={index} style={styles.monthContainer}>
          <Text style={styles.monthText}>{month}</Text>
          <View
            style={[
              styles.dot,
              availableMonths.includes(month) && styles.activeDot,
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
