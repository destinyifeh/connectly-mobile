import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import '../global.css';

import AppWrapper from '@/helpers/App-wrapper';
import {initializeUser} from '@/helpers/auth';
import {useAppNotification} from '@/helpers/services/notification';
import {servicesConfigurations} from '@/helpers/utils';
import {useColorScheme} from '@/hooks/useColorScheme';
import {useGlobalStore} from '@/stores/global-store';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const {setIsAppMounted} = useGlobalStore(state => state);
  const {notification, channels, expoPushToken} = useAppNotification();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
    RobotoItalic: require('../assets/fonts/Roboto-Italic.ttf'),
    Sans: require('../assets/fonts/OpenSans-Regular.ttf'),
  });

  useEffect(() => {
    initializeUser();
  }, []);
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      servicesConfigurations();
      setIsAppMounted(true);
      console.log(notification, 'noter');
      console.log(channels, 'note channel');
      console.log(expoPushToken, 'note token');
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AppWrapper>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="privacy-policy" />
        <Stack.Screen name="terms-of-service" />
        <Stack.Screen name="feedback" />
        <Stack.Screen name="faq" />
        <Stack.Screen name="+not-found" />
      </Stack>
      {/* <StatusBar style="auto" /> */}
    </AppWrapper>
  );
}
