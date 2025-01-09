import {AppContainer} from '@/components/AppContainer';
import {APP_DEFAULT_COLOUR} from '@/constants/Styles';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useState} from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';

export const NotificationSettingsScreen = () => {
  const [enableEmailNotification, setEnableEmailNotification] =
    useState<boolean>(false);
  const [enablePushNotification, setEnablePushNotification] =
    useState<boolean>(false);

  return (
    <AppContainer showBackButton showScreenTitle title="Notification settings">
      <ScrollView
        className="w-full"
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => setEnablePushNotification(!enablePushNotification)}
          className="bg-app-light border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text className="text-black font-sans text-base">
            Push Notification
          </Text>
          {!enablePushNotification ? (
            <MaterialCommunityIcons
              name="toggle-switch-off"
              size={30}
              color="gray"
            />
          ) : (
            <MaterialCommunityIcons
              name="toggle-switch-off"
              size={30}
              color={APP_DEFAULT_COLOUR}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setEnableEmailNotification(!enableEmailNotification)}
          className="bg-app-light border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text className="text-black font-sans text-base">
            Email Notification
          </Text>
          {!enableEmailNotification ? (
            <MaterialCommunityIcons
              name="toggle-switch-off"
              size={30}
              color="gray"
            />
          ) : (
            <MaterialCommunityIcons
              name="toggle-switch-off"
              size={30}
              color={APP_DEFAULT_COLOUR}
            />
          )}
        </TouchableOpacity>
      </ScrollView>
    </AppContainer>
  );
};

export default NotificationSettingsScreen;