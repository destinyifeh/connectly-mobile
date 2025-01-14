import React, {FC} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper: FC<AppWrapperProps> = ({children}) => {
  return <SafeAreaProvider>{children}</SafeAreaProvider>;
};

export default AppWrapper;
