import {dismissAllNotifications} from '@/helpers/services/app-notification/configure-notifications';
import * as Notifications from 'expo-notifications';
import {router} from 'expo-router';
import {useEffect} from 'react';

export function useNotificationObserver() {
  useEffect(() => {
    let isMounted = true;

    function redirect(notification: Notifications.Notification) {
      const url = notification.request.content.data?.url;
      if (url) {
        console.log(url, 'urlll');
        router.push(url);
        dismissAllNotifications();
      }
    }

    Notifications.getLastNotificationResponseAsync().then(response => {
      if (!isMounted || !response?.notification) {
        return;
      }
      redirect(response?.notification);
    });

    const subscription = Notifications.addNotificationResponseReceivedListener(
      response => {
        redirect(response.notification);
      },
    );

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);
}
