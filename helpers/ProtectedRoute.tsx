import {APP_DEFAULT_COLOUR} from '@/constants/Styles';
import {globalStore} from '@/stores/global-store';
import {useUserStore} from '@/stores/user-store';
import {router} from 'expo-router';
import {FC, useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';

interface ProctedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: FC<ProctedRouteProps> = ({children}) => {
  const {currentUser} = useUserStore(state => state);
  const {isAppMounted} = globalStore(state => state);

  useEffect(() => {
    if (isAppMounted && !currentUser.email) {
      router.navigate('/dashboard');
    }
  }, [currentUser, router, isAppMounted]);

  if (!currentUser.email && !isAppMounted) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color={APP_DEFAULT_COLOUR} size="large" />
      </View>
    );
  }

  return children;
};

export default ProtectedRoute;
