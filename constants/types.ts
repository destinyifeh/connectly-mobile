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

export interface UserDetailsProps {
  username: string;
  email: string;
  dob: string;
  hobbies: string[];
  profilePhoto: string;
  otherPhotos?: string[];
  phone?: string;
  gender: string;
  password?: string;
  _id: string;
  location?: string;
  age?: string;
  state?: string;
  city?: string;
  country?: string;
}

export type PartialUserDetailsProps = Partial<UserDetailsProps>;
