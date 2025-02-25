import * as Notifications from 'expo-notifications';

export const dismissAllNotifications = () => {
  console.log('dismiss note');
  Notifications.dismissAllNotificationsAsync();
};
