import {API_BASE_URL} from '@/constants/config';
import {useGlobalStore} from '@/stores/global-store';
import * as Notifications from 'expo-notifications';
import {router} from 'expo-router';
import {useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import {registerForPushNotificationsAsync} from './app-notification/register-device';
export const useAppNotification = () => {
  const {isChatting} = useGlobalStore(state => state);
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
    console.log(isChatting, 'checking ischatting...');
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: !isChatting,
        shouldPlaySound: !isChatting,
        shouldSetBadge: true,
      }),
    });
  }, [isChatting]);

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
        const notificationId = response.notification.request.identifier;
        if (actionIdentifier === 'markAsRead') {
          // Handle the 'Mark as Read' action
          markNotificationAsRead(notificationId);
        }
        if (actionIdentifier === 'expo.modules.notifications.actions.DEFAULT') {
          const url = response.notification.request.content.data?.url;
          const notificationId = response.notification.request.identifier;
          const data = response.notification.request.content.data;
          if (url) {
            console.log(url, 'urlll');
            console.log(data.sender.info, 'userInfo...');
            router.push({
              pathname: url,
              params: {user: JSON.stringify(data.sender.info)},
            });
          }
          markNotificationAsRead(notificationId);
        }

        if (actionIdentifier === 'reply') {
          console.log(response.userText, 'my response');
          const data = response.notification.request.content.data;
          const payload = {
            receiverId: data.sender.senderId,
            senderId: data.receiver.receiverId,
            createdAt: new Date(),
            text: response.userText,
            user: {
              _id: data.receiver.receiverId,
              name: data.receiver.name,
            },
            received: false,
            pending: true,
            sent: false,
          };
          console.log(payload, 'my text pay');
          // Handle the 'Mark as Read' action
          console.log('reply here...');

          fetch(`${API_BASE_URL}/api/v1/user/chat/create`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          })
            .then(res => {
              if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
              }
              return res.json();
            })
            .then(data => {
              console.log(data, 'response data');
            })
            .catch(err => console.log(err, 'reply err'));

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

  useEffect(() => {
    const setNotificationCategoryAsync = async () => {
      try {
        await Notifications.setNotificationCategoryAsync('message', [
          {
            identifier: 'markAsRead',
            buttonTitle: 'Mark as Read',
            options: {opensAppToForeground: false},
          },
          {
            identifier: 'reply',
            buttonTitle: 'Reply',
            textInput: {
              placeholder: 'Reply...',
              submitButtonTitle: 'Send',
            },
            options: {opensAppToForeground: false},
          },
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    setNotificationCategoryAsync();
  }, []);
  return {expoPushToken, channels, notification};
};
