import {AppContainer} from '@/components/AppContainer';
import {AppLoader} from '@/components/AppLoader';
import AppList from '@/constants/AppPackages';
import {APP_DEFAULT_COLOUR} from '@/constants/Styles';
import {AppListType} from '@/constants/types';
import {apiHookRequester} from '@/services/api/hooks';
import {useGlobalStore} from '@/stores/global-store';
import {useUserStore} from '@/stores/user-store';
import {useRouter} from 'expo-router';
import {useEffect} from 'react';
import {
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const MyNotifications = ({notification}: AppListType) => {
  const {themeColor} = useGlobalStore(state => state);
  const router = useRouter();
  return (
    <View className="w-screen self-center border-b border-gray-200 h-[60] justify-center">
      <View className="w-[90%] self-center">
        <TouchableOpacity className="flex-row items-center gap-3">
          <Image
            source={require('../../assets/images/couple_bg.jpg')}
            className="h-[45] w-[45] rounded-3xl"
            resizeMode="cover"
          />
          <View className="flex-row items-center gap-1">
            <Text
              className="text-black font-sans font-bold text-lg"
              style={{color: themeColor.text}}>
              Anita, 28
            </Text>
            <Text
              className="text-gray font-sans"
              style={{color: themeColor.text}}>
              is interested in you
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default function NotificationScreen() {
  const router = useRouter();
  const {themeColor} = useGlobalStore(state => state);
  const {currentUser, isConnected} = useUserStore(state => state);
  const {
    isSuccess,
    isLoading: isLoadingNotifications,
    isFetching,
    isError,
    error,
    refetch,
    data: notificationsData,
  } = apiHookRequester.useFetchData(
    currentUser._id ? `/api/v1/user/notifications/${currentUser?._id}` : '',
    'myNotes',
  );

  const {mutate} = apiHookRequester.useUpdateData(
    `/api/v1/user/notification/${currentUser?._id}`,
  );

  useEffect(() => {
    updateNotification();
  }, []);

  const updateNotification = () => {
    const payload = {
      userId: currentUser._id,
    };
    mutate(payload, {
      onSuccess(data, variables, context) {
        console.log(data, 'datamee updating');
      },
      onError(error, variables, context) {
        console.log(error, 'err updating...');
      },
    });
  };

  const renderFooter = () => {
    console.log(error, 'err notes');
    const {message, code} = (error as any)?.data || {};
    const {notificationMessage, notificationCode} =
      notificationsData?.data || {};

    if (isLoadingNotifications || isFetching) {
      return (
        <View style={{paddingVertical: 20, marginTop: 80, alignSelf: 'center'}}>
          <AppLoader />
        </View>
      );
    }
    return (
      <View style={{paddingVertical: 20, marginTop: 80}}>
        <Text
          className="text-base font-sans text-center"
          style={{color: themeColor.text}}>
          {message || notificationMessage}
        </Text>
      </View>
    );
  };
  const {notifications} = notificationsData?.data || [];
  console.log(notifications, 'list for notes');

  const renderItem = ({item}: {item: AppListType}) => {
    return (
      <MyNotifications notification={item} refetchNotifications={refetch} />
    );
  };

  return (
    <AppContainer showBackButton showScreenTitle title="Notifications">
      <View className="w-screen self-center border-b border-gray-200 h-[60] justify-center">
        <View className="w-[90%] self-center">
          <TouchableOpacity
            onPress={() => router.push('/dashboard/user-details')}
            className="flex-row items-center gap-3">
            <Image
              source={require('../../assets/images/couple_bg.jpg')}
              className="h-[45] w-[45] rounded-3xl"
              resizeMode="cover"
            />
            <View className="flex-row items-center gap-1">
              <Text
                className="text-black font-sans font-bold text-lg"
                style={{color: themeColor.text}}>
                Anita, 28
              </Text>
              <Text
                className="text-gray font-sans"
                style={{color: themeColor.text}}>
                visited your profile
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1">
        <AppList
          data={isFetching ? [] : notifications}
          renderItem={renderItem}
          estimatedItemSize={200}
          contentContainerStyle={{paddingBottom: 10}}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={refetch}
              colors={[APP_DEFAULT_COLOUR]}
            />
          }
        />
      </View>
    </AppContainer>
  );
}
