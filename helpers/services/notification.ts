import * as Notifications from 'expo-notifications';
import {useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import {registerForPushNotificationsAsync} from './app-notification/register-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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
