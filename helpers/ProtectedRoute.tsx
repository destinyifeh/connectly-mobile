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
  const {isAppMounted, setIsAppMounted} = globalStore(state => state);

  useEffect(() => {
    if (isAppMounted && currentUser.email) {
      //  console.log(currentUser, 'my current');

      router.navigate('/dashboard');
    }
  }, [currentUser, router, isAppMounted]);

  if (!isAppMounted) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color={APP_DEFAULT_COLOUR} size="large" />
      </View>
    );
  }

  if (isAppMounted && !currentUser.email) {
    return children;
  }

  return null;
};

export default ProtectedRoute;
