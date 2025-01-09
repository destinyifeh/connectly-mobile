import {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';

type AppButtonProps = {
  onPress?: () => void;
  title: string;
  disabled?: boolean;
  isLoading?: boolean;
};

export const AppButton: FC<AppButtonProps> = ({
  onPress,
  title,
  isLoading,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      onPress={onPress}
      className={`${
        disabled ? 'bg-app-ghost' : 'bg-app-default'
      }  h-[40.7px] rounded-3xl w-full justify-center my-5`}>
      <Text
        className={`${
          disabled ? 'text-gray-400' : 'text-app-dark '
        } text-center text-lg font-bold font-sans`}>
        {isLoading ? 'Please wait...' : title}
      </Text>
    </TouchableOpacity>
  );
};
