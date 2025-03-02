import {AppContainer} from '@/components/AppContainer';
import {AppLoader} from '@/components/AppLoader';
import AppList from '@/constants/AppPackages';
import {APP_DEFAULT_COLOUR} from '@/constants/Styles';
import {AppListType} from '@/constants/types';
import {formatToDynamicTime, getUserCurrentAge} from '@/helpers/formatters';
import {apiHookRequester} from '@/services/api/hooks';
import {useGlobalStore} from '@/stores/global-store';
import {useUserStore} from '@/stores/user-store';
import {useIsFocused} from '@react-navigation/native';
import {useRouter} from 'expo-router';
import {useEffect, useState} from 'react';
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
        <TouchableOpacity
          className="flex-row items-center gap-3"
          onPress={() =>
            router.push({
              pathname: '/dashboard/user-details',
              params: {
                userInfo: JSON.stringify(notification.from),
                previousScreen: 'notification',
              },
            })
          }>
          <Image
            source={{uri: notification.from.profilePhoto.url}}
            className="h-[45] w-[45] rounded-3xl"
            resizeMode="cover"
          />
          <View>
            <View className="flex-row items-center gap-1  w-[100%]">
              <Text
                className="text-black font-sans font-bold text-lg capitalize"
                style={{color: themeColor.text, maxWidth: 150}}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {notification.from.username},{' '}
                {getUserCurrentAge(notification.from.dob)}
              </Text>
              <Text
                className="text-gray font-sans"
                style={{color: themeColor.text}}>
                {notification.title}
              </Text>
            </View>
            <Text
              className="text-gray font-sans"
              style={{color: themeColor.text}}>
              {formatToDynamicTime(notification.createdAt)}
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
  const [page, setPage] = useState({
    pageSize: 15,
    pageNo: 1,
    totalPages: 0,
    count: 0,
  });
  const [pageStatus, setPageStatus] = useState(false);

  const [isRefreshing, setRefreshing] = useState(false);
  const [myNotifications, setMyNotifications] = useState<string[]>([]);
  const {
    isSuccess,
    isLoading: isLoadingNotifications,
    isFetching,
    isError,
    error,
    refetch: refetchNotifications,
    data: notificationsData,
  } = apiHookRequester.useFetchData(
    currentUser._id
      ? `/api/v1/user/notifications/${currentUser?._id}?page=${page.pageNo}&limit=${page.pageSize}`
      : '',
    'myNotes',
  );

  const {mutate} = apiHookRequester.useUpdateData(
    `/api/v1/user/notification/viewed/${currentUser?._id}`,
  );
  const isFocused = useIsFocused();

  useEffect(() => {
    updateNotification();
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     if (notificationsData?.data?.notifications?.length > 0) {
  //       const {
  //         notifications,
  //         pagination: {totalPages, totalElements, page},
  //       } = notificationsData?.data || {};
  //       console.log('refreshing...:', notifications);
  //       console.log({notifications, totalElements, totalPages, page});
  //       if (myNotifications.length < totalElements) {
  //         setMyNotifications([...myNotifications, ...notifications]);
  //         setPage(prev => ({
  //           ...prev,
  //           page: page,
  //           totalPages: totalPages,
  //           count: totalElements,
  //         }));
  //       }
  //     } else {
  //       console.log(notificationsData, 'what...');
  //     }
  //   }, [notificationsData]),
  // );

  useEffect(() => {
    if (notificationsData?.data?.notifications?.length > 0) {
      const {
        notifications,
        pagination: {totalPages, totalElements, page},
      } = notificationsData?.data || {};
      console.log('refreshing...:', notifications);
      console.log({notifications, totalElements, totalPages, page});
      if (myNotifications.length < totalElements) {
        setMyNotifications([...myNotifications, ...notifications]);
        setPage(prev => ({
          ...prev,
          page: page,
          totalPages: totalPages,
          count: totalElements,
        }));
      }
    } else {
      console.log(notificationsData, 'what...');
    }
  }, [notificationsData]);
  useEffect(() => {
    if (page.pageNo > 1) {
      console.log('page-updated:', page.pageNo);
      console.log(myNotifications, 'update-botifications');
      refetchNotifications();
    }
  }, [page.pageNo]);

  useEffect(() => {
    if (isRefreshing) {
      console.log('page-refresh:', page.pageNo);
      console.log(myNotifications, 'refresh-notifications');
      refetchNotifications();
      setRefreshing(false);
    }
  }, [isRefreshing]);

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

  const handleEndReached = () => {
    console.log(
      myNotifications,
      'update-notifications33',
      page.pageNo,
      'pager',
    );

    if (page.pageNo < page.totalPages) {
      setPage(prev => ({
        ...prev,
        pageNo: prev.pageNo + 1,
      }));
    }
  };

  const _onRefresh = () => {
    console.log('calling onrefresh...');
    setRefreshing(true);
    setMyNotifications([]);
    setPage(prev => ({
      ...prev,
      pageNo: 1,
      pageSize: 10,
      totalPages: 0,
      count: 0,
    }));
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

  const renderItem = ({item}: {item: any}) => {
    return (
      <MyNotifications
        notification={item}
        refetchNotifications={refetchNotifications}
      />
    );
  };

  return (
    <AppContainer showBackButton showScreenTitle title="Notifications">
      <View className="flex-1">
        <AppList
          data={myNotifications}
          renderItem={renderItem}
          estimatedItemSize={100}
          contentContainerStyle={{paddingBottom: 10}}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
          //onEndReached={handleEndReached}
          onMomentumScrollEnd={handleEndReached}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={_onRefresh}
              colors={[APP_DEFAULT_COLOUR]}
            />
          }
        />
      </View>
    </AppContainer>
  );
}
