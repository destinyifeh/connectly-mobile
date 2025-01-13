import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import '../global.css';

import {monitorThemeAppearance} from '@/helpers/utils';
import {useColorScheme} from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
    RobotoItalic: require('../assets/fonts/Roboto-Italic.ttf'),
    Sans: require('../assets/fonts/OpenSans-Regular.ttf'),
  });

  useEffect(() => {
    monitorThemeAppearance();
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(auth)" options={{headerShown: false}} />
        <Stack.Screen name="dashboard" options={{headerShown: false}} />
        <Stack.Screen name="privacy-policy" options={{headerShown: false}} />
        <Stack.Screen name="terms-of-service" options={{headerShown: false}} />
        <Stack.Screen name="feedback" options={{headerShown: false}} />
        <Stack.Screen name="faq" options={{headerShown: false}} />
        <Stack.Screen name="+not-found" />
      </Stack>
      {/* <StatusBar style="auto" /> */}
    </>
  );
}
