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

type ProfilePhotoProps = {
  url: string;
  id?: string;
};
export interface CurrentUserProps {
  username: string;
  email: string;
  dob: string;
  hobbies: string[];
  profilePhoto: ProfilePhotoProps;
  otherPhotos?: string[];
  phone?: string;
  gender: string;
  password?: string;
  _id?: string;
  location?: string;
  age?: string;
  state?: string;
  city?: string;
  country?: string;
}

export type PartialCurrentUserProps = Partial<CurrentUserProps>;
