import {
  AppDarkTheme,
  AppLightTheme,
  THEME_ISDARK,
  THEME_ISLIGHT,
} from '@/constants/Colors';
import {APP_THEME_PREFERENCE} from '@/constants/config';
import {getDeviceData, saveDeviceData} from '@/stores/device-store';
import {globalStore} from '@/stores/global-store';
import {Appearance} from 'react-native';

const applyUserTheme = async () => {
  const storedTheme = await getDeviceData(APP_THEME_PREFERENCE);
  if (storedTheme?.type === THEME_ISDARK) {
    globalStore.getState().setThemeColor(AppDarkTheme);
  } else if (storedTheme?.type === THEME_ISLIGHT) {
    globalStore.getState().setThemeColor(AppLightTheme);
  }
};

export const monitorThemeAppearance = async () => {
  const subscription = Appearance.addChangeListener(async ({colorScheme}) => {
    if (colorScheme === 'dark') {
      globalStore.getState().setThemeColor(AppDarkTheme);
      await saveDeviceData(APP_THEME_PREFERENCE, AppDarkTheme);
    } else if (colorScheme === 'light') {
      globalStore.getState().setThemeColor(AppLightTheme);
      await saveDeviceData(APP_THEME_PREFERENCE, AppLightTheme);
    }
  });
  applyUserTheme();
  return () => subscription.remove();
};
