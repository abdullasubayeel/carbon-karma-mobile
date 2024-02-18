import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {orgStyles} from '../../../styles/organizationStyles';
import {COLORS} from '../../../constants/colors';

import Icon from 'react-native-vector-icons/Ionicons';

type NeutralityCardProps = {
  date?: string;
  message?: string;
  carbonNeutral?: boolean;
};
const NeutralityCard = ({
  date,
  message,
  carbonNeutral,
}: NeutralityCardProps) => {
  return carbonNeutral ? (
    <View style={orgStyles.neutralityCard}>
      <Icon name="checkmark-circle" color={COLORS.primaryColor} size={100} />
      <Text style={styles.bold}>{message}</Text>
      <Text style={orgStyles.small}>{date}</Text>
    </View>
  ) : (
    <View style={orgStyles.nonNeutralityCard}>
      <Icon name="warning" color={COLORS.red} size={100} />
      <Text style={styles.bold}>{message}</Text>
      <Text style={orgStyles.small}>{date}</Text>
    </View>
  );
};

export default NeutralityCard;

const styles = StyleSheet.create({
  bold: {
    fontWeight: '500',
    textAlign: 'center',
    color: COLORS.black,
  },
});
