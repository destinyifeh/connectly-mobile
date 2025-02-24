import * as Notifications from 'expo-notifications';
import {router} from 'expo-router';
import {useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import {registerForPushNotificationsAsync} from './app-notification/register-device';
export const useAppNotification = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    [],
  );
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  const markNotificationAsRead = (notificationId: string) => {
    console.log(notificationId, 'note to dismiss');
    Notifications.dismissNotificationAsync(notificationId);
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      token => token && setExpoPushToken(token),
    );

    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then(value =>
        setChannels(value ?? []),
      );
    }
    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
        console.log(notification, 'my incoming notifyy');
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response, 'interaction by me');
        const actionIdentifier = response.actionIdentifier;
        if (actionIdentifier === 'markAsRead') {
          // Handle the 'Mark as Read' action
          const notificationId = response.notification.request.identifier;
          markNotificationAsRead(notificationId);
        }
        if (actionIdentifier === 'expo.modules.notifications.actions.DEFAULT') {
          const url = response.notification.request.content.data?.url;
          const notificationId = response.notification.request.identifier;
          if (url) {
            console.log(url, 'urlll');
            router.push(url);
          }
          markNotificationAsRead(notificationId);
        }
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return {expoPushToken, channels, notification};
};
