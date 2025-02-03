import React, {FC} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

interface AppWrapperProps {
  children: React.ReactNode;
}

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();
const AppWrapper: FC<AppWrapperProps> = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>{children}</SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default AppWrapper;
