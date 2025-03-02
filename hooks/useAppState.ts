import {isAuthTokenExpired} from '@/helpers/auth';
import {clearUserDeviceData, getDeviceData} from '@/stores/device-store';
import {router, usePathname} from 'expo-router';
import {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';
import {Toast} from 'toastify-react-native';
import {REFRESH_TOKEN_KEY} from './../constants/config';
const routes = [
  '/',
  '/login',
  '/signup',
  '/upload',
  '/verify-email',
  '/reset-password',
  '/forgot-password',
  '/complete-setup',
  '/faq',
  '/privacy-policy',
  '/terms-of-service',
];
const useAppState = () => {
  const currentRoute = usePathname();
  const currentRouteRef = useRef(currentRoute);
  const [appStatus, setAppStatus] = useState(AppState.currentState);

  useEffect(() => {
    currentRouteRef.current = currentRoute;
    console.log('currentRoute:', currentRoute);
    console.log('current-app-state:', appStatus);
  }, [currentRoute, appStatus]);

  useEffect(() => {
    const handleAppStateChange = async (state: any) => {
      console.log(state, 'app-state-updated');
      setAppStatus(state);
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const handleActiveAuth = async () => {
    console.log('current auth:', appStatus);
    if (appStatus === 'active' && !routes.includes(currentRouteRef.current)) {
      try {
        const refreshToken = await getDeviceData(REFRESH_TOKEN_KEY);
        console.log(refreshToken, 'refreshToken');
        if (!refreshToken || isAuthTokenExpired(refreshToken)) {
          console.log('Active state: Session expired33.');
          console.log(currentRouteRef.current, 'currentroute');
          await clearUserDeviceData();
          Toast.error('Session expired. Please log in again.', 'bottom');
          router.replace('/login');
        }
      } catch (error) {
        console.error('Error handling app state:', error);
      }
    }
  };

  useEffect(() => {
    handleActiveAuth();
  }, [appStatus]);

  return {appStatus, currentRoute};
};

export default useAppState;
