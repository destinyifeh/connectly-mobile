/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import {ThemeColorProps} from './types';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const AppDarkTheme: ThemeColorProps = {
  type: 'Dark',
  //text: '#ECEDEE',
  text: 'rgb(229, 229, 231)',
  background: '#151718',
  tint: tintColorDark,
  icon: '#9BA1A6',
  tabIconDefault: '#9BA1A6',
  tabIconSelected: tintColorDark,
  barColor: 'light-content',
};

export const AppLightTheme: ThemeColorProps = {
  type: 'Light',
  //text: '#11181C',
  text: 'rgb(28, 28, 30)',
  background: '#fff',
  tint: tintColorLight,
  icon: '#687076',
  tabIconDefault: '#687076',
  tabIconSelected: tintColorLight,
  barColor: 'dark-content',
};

// export const AppThemeColors: Record<string, ThemeColorProps> = {
//   light: {
//     type: 'Light',
//     text: '#11181C',
//     background: '#fff',
//     tint: tintColorLight,
//     icon: '#687076',
//     tabIconDefault: '#687076',
//     tabIconSelected: tintColorLight,
//     barColor: 'dark-content',
//   },
//   dark: {
//     type: 'Dark',
//     text: '#ECEDEE',
//     background: '#151718',
//     tint: tintColorDark,
//     icon: '#9BA1A6',
//     tabIconDefault: '#9BA1A6',
//     tabIconSelected: tintColorDark,
//     barColor: 'light-content',
//   },
// };

export const THEME_ISLIGHT = 'Light';
export const THEME_ISDARK = 'Dark';
