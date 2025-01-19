import {AppLoader} from '@/components/AppLoader';
import {globalStore} from '@/stores/global-store';
import {useUserStore} from '@/stores/user-store';
import {router} from 'expo-router';
import {FC, useEffect} from 'react';
import {View} from 'react-native';

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
        <AppLoader />
      </View>
    );
  }

  if (isAppMounted && !currentUser.email) {
    return children;
  }

  return null;
};

export default ProtectedRoute;
