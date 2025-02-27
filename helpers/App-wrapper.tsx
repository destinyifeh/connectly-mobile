import React, {FC} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ToastManager from 'toastify-react-native';
interface AppWrapperProps {
  children: React.ReactNode;
}

import {currentDeviceWidth} from '@/constants/Styles';
import {SocketProvider} from '@/contexts/socketContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();
const AppWrapper: FC<AppWrapperProps> = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <SafeAreaProvider>
          {children}
          <ToastManager
            animationStyle="zoomInOut"
            style={{borderRadius: 5, width: '100%'}}
            textStyle={{
              color: 'black',
              fontSize: 16,
              flexWrap: 'wrap',
            }}
            width={currentDeviceWidth * 0.9}
            height={80}
            duration={5000}
          />
        </SafeAreaProvider>
      </SocketProvider>
    </QueryClientProvider>
  );
};

export default AppWrapper;
