import {AppLoader} from '@/components/AppLoader';
import {useGlobalStore} from '@/stores/global-store';
import {useUserStore} from '@/stores/user-store';
import {router} from 'expo-router';
import {FC, useEffect} from 'react';
import {View} from 'react-native';

interface ProctedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: FC<ProctedRouteProps> = ({children}) => {
  const {currentUser} = useUserStore(state => state);
  const {isAppMounted, setIsAppMounted} = useGlobalStore(state => state);

  useEffect(() => {
    if (isAppMounted && currentUser?._id) {
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

  if (isAppMounted && !currentUser?._id) {
    return children;
  }

  return null;
};

export default ProtectedRoute;
