import {
  AppDarkTheme,
  AppLightTheme,
  THEME_ISDARK,
  THEME_ISLIGHT,
} from '@/constants/Colors';
import {APP_THEME_PREFERENCE} from '@/constants/config';
import {getDeviceData, saveDeviceData} from '@/stores/device-store';
import {globalStore} from '@/stores/global-store';
import * as NavigationBar from 'expo-navigation-bar';
import {Appearance} from 'react-native';
const applyUserTheme = async () => {
  const storedTheme = await getDeviceData(APP_THEME_PREFERENCE);
  if (storedTheme?.type === THEME_ISDARK) {
    NavigationBar.setBackgroundColorAsync(AppDarkTheme.background);
    globalStore.getState().setThemeColor(AppDarkTheme);
  } else if (storedTheme?.type === THEME_ISLIGHT) {
    NavigationBar.setBackgroundColorAsync(AppLightTheme.background);
    globalStore.getState().setThemeColor(AppLightTheme);
  }
};

export const monitorThemeAppearance = async () => {
  const subscription = Appearance.addChangeListener(async ({colorScheme}) => {
    if (colorScheme === 'dark') {
      globalStore.getState().setThemeColor(AppDarkTheme);
      NavigationBar.setBackgroundColorAsync(AppDarkTheme.background);
      await saveDeviceData(APP_THEME_PREFERENCE, AppDarkTheme);
    } else if (colorScheme === 'light') {
      globalStore.getState().setThemeColor(AppLightTheme);
      NavigationBar.setBackgroundColorAsync(AppLightTheme.background);
      await saveDeviceData(APP_THEME_PREFERENCE, AppLightTheme);
    }
  });
  applyUserTheme();
  return () => subscription.remove();
};
