import {
  AppDarkTheme,
  AppLightTheme,
  THEME_ISDARK,
  THEME_ISLIGHT,
} from '@/constants/Colors';
import {APP_THEME_PREFERENCE} from '@/constants/config';
import {getDeviceData, saveDeviceData} from '@/stores/device-store';
import {useGlobalStore} from '@/stores/global-store';
import {useUserStore} from '@/stores/user-store';
import * as Location from 'expo-location';
import * as NavigationBar from 'expo-navigation-bar';
import * as Speech from 'expo-speech';
import {Alert, Appearance, BackHandler, Linking, Platform} from 'react-native';
const applyUserTheme = async () => {
  const storedTheme = await getDeviceData(APP_THEME_PREFERENCE);
  if (storedTheme?.type === THEME_ISDARK) {
    NavigationBar.setBackgroundColorAsync(AppDarkTheme.background);
    useGlobalStore.getState().setThemeColor(AppDarkTheme);
  } else if (storedTheme?.type === THEME_ISLIGHT) {
    NavigationBar.setBackgroundColorAsync(AppLightTheme.background);
    useGlobalStore.getState().setThemeColor(AppLightTheme);
  }
};

export const monitorThemeAppearance = async () => {
  const subscription = Appearance.addChangeListener(async ({colorScheme}) => {
    if (colorScheme === 'dark') {
      useGlobalStore.getState().setThemeColor(AppDarkTheme);
      NavigationBar.setBackgroundColorAsync(AppDarkTheme.background);
      await saveDeviceData(APP_THEME_PREFERENCE, AppDarkTheme);
    } else if (colorScheme === 'light') {
      useGlobalStore.getState().setThemeColor(AppLightTheme);
      NavigationBar.setBackgroundColorAsync(AppLightTheme.background);
      await saveDeviceData(APP_THEME_PREFERENCE, AppLightTheme);
    }
  });
  applyUserTheme();
  return () => subscription.remove();
};

//ios

// const handleButtonPress = async () => {
//   await Linking.openURL('app-switcher:');
// };

const backAction = () => {
  BackHandler.exitApp();
  return true;
};

const handleButtonPress = () => {
  BackHandler.addEventListener('hardwareBackPress', backAction);
  BackHandler.exitApp();
};

const trigggerLocationService = () => {
  if (Platform.OS === 'ios') {
    Linking.openURL('app-settings:');
  } else {
    Linking.openSettings();
  }
};

async function getCurrentLocation() {
  let {status} = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert(
      'Location Permission Needed',
      'Location permission is necessary for app functionality. Grant access to enjoy a seamless experience',
      [
        {
          text: 'Exit',
          onPress: handleButtonPress,
        },
        {
          text: 'Grant access',
          onPress: () => trigggerLocationService(),
        },
      ],
    );
    console.log('Permission to access location was denied');
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
  console.log(location, 'my location');
  const address = await Location.reverseGeocodeAsync(location.coords);
  console.log(address, 'my address');
  const street = address[0].street;
  const city = address[0].city;
  const region = address[0].region;
  const country = address[0].country;
  console.log(`$${city}-${region}-${country}, 'my address33`);
  const locationData = {
    ...useUserStore.getState().currentUserLocation,
    city: city ?? undefined,
    state: region ?? undefined,
    country: country ?? undefined,
  };

  useUserStore.getState().setCurrentUserLocation(locationData);
}

const speak = () => {
  const thingToSay = 'Welcome to conectly';
  Speech.speak(thingToSay);
};
async function servicesConfigurations() {
  await monitorThemeAppearance();
  await getCurrentLocation();
  speak();
}

export {servicesConfigurations};
