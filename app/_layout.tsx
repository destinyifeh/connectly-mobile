import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import '../global.css';

import {
  AppDarkTheme,
  AppLightTheme,
  THEME_ISDARK,
  THEME_ISLIGHT,
} from '@/constants/Colors';
import {APP_THEME_PREFERENCE} from '@/constants/config';
import {useColorScheme} from '@/hooks/useColorScheme';
import {getDeviceData} from '@/stores/device-store';
import {useGlobalStore} from '@/stores/global-store';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const {themeColor, setTheme, setThemeColor} = useGlobalStore(state => state);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
    RobotoItalic: require('../assets/fonts/Roboto-Italic.ttf'),
    Sans: require('../assets/fonts/OpenSans-Regular.ttf'),
  });

  useEffect(() => {
    const applyUserTheme = async () => {
      const storedTheme = await getDeviceData(APP_THEME_PREFERENCE);
      if (storedTheme?.type === THEME_ISDARK) {
        setThemeColor(AppDarkTheme);
      } else if (storedTheme?.type === THEME_ISLIGHT) {
        setThemeColor(AppLightTheme);
      } else {
        console.log('No device theme preference');
        // Fallback to system color scheme if no preference is stored
        if (colorScheme === 'dark') {
          setThemeColor(AppDarkTheme);
        } else {
          setThemeColor(AppLightTheme);
        }
      }
    };

    applyUserTheme();
  }, [colorScheme]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
    </ThemeProvider>
  );
}
