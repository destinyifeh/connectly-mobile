import {StatusBarStyle} from 'react-native';

export interface ThemeColorProps {
  type: string;
  text: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  barColor: StatusBarStyle;
}
