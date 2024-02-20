import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NotificationType} from '../../../enums/organization';
import {orgStyles} from '../../../styles/organizationStyles';
import {globalStyles} from '../../../styles/global';
import {COLORS} from '../../../constants/colors';

const NotificationTile = (props: NotificationType) => {
  return (
    <TouchableOpacity
      style={[styles.notifyCard, !props.is_read && styles.darkBg]}>
      <View style={globalStyles.row}>
        <Text style={orgStyles.boldText}>{props.title}</Text>
        <Text style={orgStyles.small}>{!props.is_read && 'Unread'}</Text>
      </View>
      <Text>{props.message}</Text>
    </TouchableOpacity>
  );
};

export default NotificationTile;

const styles = StyleSheet.create({
  notifyCard: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    elevation: 1,
    backgroundColor: COLORS.white,
  },
  darkBg: {
    backgroundColor: COLORS.grey,
  },
});
