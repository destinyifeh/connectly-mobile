import {AppContainer} from '@/components/AppContainer';
import {AppDarkTheme, AppLightTheme, THEME_ISLIGHT} from '@/constants/Colors';
import {APP_THEME_PREFERENCE} from '@/constants/config';
import {APP_DEFAULT_COLOUR} from '@/constants/Styles';
import {saveDeviceData} from '@/stores/device-store';
import {globalStore} from '@/stores/global-store';
import {MaterialCommunityIcons, Octicons} from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

export const SettingsScreen = () => {
  const router = useRouter();
  const {themeColor, setThemeColor} = globalStore(state => state);
  console.log(themeColor, 'themecccc');

  const onSetTheme = async () => {
    if (themeColor.type === THEME_ISLIGHT) {
      setThemeColor(AppDarkTheme);
      await saveDeviceData(APP_THEME_PREFERENCE, AppDarkTheme);
    } else {
      setThemeColor(AppLightTheme);
      await saveDeviceData(APP_THEME_PREFERENCE, AppLightTheme);
    }
  };
  return (
    <AppContainer showBackButton showScreenTitle title="Settings">
      <ScrollView
        className="w-full"
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => router.push('/dashboard/(settings)/account')}
          className="border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text
            className="text-black font-sans text-base"
            style={{color: themeColor.text}}>
            Account
          </Text>
          <Octicons name="chevron-right" size={16} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/dashboard/(settings)/notification')}
          className="border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text
            className="text-black font-sans text-base"
            style={{color: themeColor.text}}>
            Notification
          </Text>
          <Octicons name="chevron-right" size={16} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/feedback')}
          className="border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text
            className="text-black font-sans text-base"
            style={{color: themeColor.text}}>
            Support
          </Text>
          <Octicons name="chevron-right" size={16} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/privacy-policy')}
          className="border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text
            className="text-black font-sans text-base"
            style={{color: themeColor.text}}>
            Privacy Policy
          </Text>
          <Octicons name="chevron-right" size={16} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/faq')}
          className="border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text
            className="text-black font-sans text-base"
            style={{color: themeColor.text}}>
            FAQ
          </Text>
          <Octicons name="chevron-right" size={16} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/terms-of-service')}
          className="border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text
            className="text-black font-sans text-base"
            style={{color: themeColor.text}}>
            Terms of Service
          </Text>
          <Octicons name="chevron-right" size={16} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSetTheme}
          className="border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text
            className="text-black font-sans text-base"
            style={{color: themeColor.text}}>
            Theme
          </Text>
          <View className="flex-row items-center gap-3 font-bold font-sans">
            <Text className="text-black" style={{color: themeColor.text}}>
              {themeColor.type}
            </Text>
            {themeColor.type !== THEME_ISLIGHT ? (
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
          </View>
        </TouchableOpacity>
      </ScrollView>
    </AppContainer>
  );
};
