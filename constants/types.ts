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

export interface CurrentUserProps {
  [key: string]: any;
}

export interface AppListType {
  [key: string]: any;
}

export interface CurrentUserLocationProps {
  city: string | undefined;
  state: string | undefined;
  country: string | undefined;
}

export interface FileProps {
  uri: string;
  width: number;
  height: number;
  mimeType: string | undefined;
  fileSize: number | undefined;
  size: number | undefined;
  type: string | undefined;
  fileName: string | null | undefined;
  name: string | undefined;
}
