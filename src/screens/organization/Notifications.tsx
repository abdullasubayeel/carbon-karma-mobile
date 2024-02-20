import {SectionList, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {useGetNotificationsQuery} from '../../api/endpoint/organizationEndpoint';
import AuthContext from '../../context/AuthProvider';
import NotificationTile from './helpers/NotificationTile';
import {groupNotificationsByDate} from '../../utilities/groupbyDate';
import {NotificationType} from '../../enums/organization';
import {orgStyles} from '../../styles/organizationStyles';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';
import {COLORS} from '../../constants/colors';
import {globalStyles} from '../../styles/global';
import moment from 'moment';

const Notifications = () => {
  const {auth} = useContext(AuthContext);

  const {data: notifications, isLoading: isNotificationLoading} =
    useGetNotificationsQuery(auth._id);

  const ntfs: NotificationType[] = notifications?.response ?? [];

  // Group notifications by date
  const groupedNotifications: {title: string; data: NotificationType[]}[] =
    groupNotificationsByDate(ntfs ?? []);

  console.log(groupedNotifications);

  if (isNotificationLoading) {
    return (
      <CustomActivityIndicator
        size="large"
        message="Checking for Notifications..."
      />
    );
  }

  return (
    <View>
      <SectionList
        sections={groupNotificationsByDate(notifications?.response ?? [])}
        keyExtractor={(item, index) => item._id + index}
        renderItem={({item}) => (
          <View style={orgStyles.notificationContainer}>
            <View style={[globalStyles.row]}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={orgStyles.small}>
                {moment(item.date).fromNow()}
                {/* {!item.is_read && 'Unread'} */}
              </Text>
            </View>
            <Text style={orgStyles.small}>{item.message}</Text>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.heading}>{title}</Text>
        )}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.primaryColor,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
    margin: 12,
  },
});
