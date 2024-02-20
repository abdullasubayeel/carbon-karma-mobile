import moment from 'moment';
import {NotificationType} from '../enums/organization';

export const groupNotificationsByDate = (
  notifications: NotificationType[],
): {title: string; data: NotificationType[]}[] => {
  const groupedNotifications = new Map<string, NotificationType[]>();

  notifications.forEach(notification => {
    const dateKey = moment(notification.date).format('DD MMMM YYYY ');
    if (groupedNotifications.has(dateKey)) {
      groupedNotifications.get(dateKey)!.push(notification);
    } else {
      groupedNotifications.set(dateKey, [notification]);
    }
  });

  // Convert Map to an array of objects suitable for SectionList
  const sections = Array.from(groupedNotifications, ([title, data]) => ({
    title,
    data,
  }));
  return sections;
};
