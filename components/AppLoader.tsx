import {APP_DEFAULT_COLOUR} from '@/constants/Styles';
import {ActivityIndicator} from 'react-native';
import LoaderKit from 'react-native-loader-kit';

type IndicatorProps = {
  color?: string;
  size?: number;
  name?: string;
};

export const AppActivityIndicator = ({color, size}: IndicatorProps) => {
  return (
    <ActivityIndicator
      size={size ?? 'large'}
      color={color ?? APP_DEFAULT_COLOUR}
    />
  );
};

export const AppLoader = ({color, name, size}: IndicatorProps) => {
  return (
    <LoaderKit
      style={{width: 50, height: 50}}
      name={name ?? 'BallSpinFadeLoader'} // Optional: see list of animations below
      color={color ?? APP_DEFAULT_COLOUR} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
    />
  );
};
