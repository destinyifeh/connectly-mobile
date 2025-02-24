import * as Notifications from 'expo-notifications';

export function configureNotifications() {
  // Set the notification handler
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  // Define the notification category with actions
  Notifications.setNotificationCategoryAsync('message', [
    {
      identifier: 'markAsRead',
      buttonTitle: 'Mark as Read',
      options: {opensAppToForeground: false},
    },
    {
      identifier: 'reply',
      buttonTitle: 'Reply',
      textInput: {placeholder: 'reply...', submitButtonTitle: 'Send'},
    },
  ]);
}
