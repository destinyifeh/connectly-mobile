import {AppContainer} from '@/components/AppContainer';
import {AppLoader} from '@/components/AppLoader';
import AppList from '@/constants/AppPackages';
import {APP_DEFAULT_COLOUR} from '@/constants/Styles';
import {AppListType} from '@/constants/types';
import {dismissAllNotifications} from '@/helpers/services/app-notification/configure-notifications';
import {apiHookRequester} from '@/services/api/hooks';
import {useGlobalStore} from '@/stores/global-store';
import {useUserStore} from '@/stores/user-store';
import {Ionicons} from '@expo/vector-icons';
import {useFocusEffect, useRouter} from 'expo-router';
import moment from 'moment';
import {useCallback, useEffect} from 'react';
import {
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const MyChats = ({chat}: AppListType) => {
  const router = useRouter();

  const {themeColor} = useGlobalStore(state => state);
  const {currentUser} = useUserStore(state => state);
  const isSameUser = chat?.user._id === currentUser._id;
  console.log(isSameUser, 'issameuser');
  console.log(chat, 'meuser');
  console.log(currentUser._id, 'meuserId');
  //const formatTime = moment(chat.createdAt).fromNow(true);
  const formatTime = moment(chat.createdAt).calendar(null, {
    sameDay: 'HH:mm', // Today, display only time, e.g., "19:20"
    lastDay: '[Yesterday]', // Yesterday, display "Yesterday"
    lastWeek: 'DD/MM/YYYY', // For dates in the last week (or older), display as "10/02/2025"
    sameElse: 'DD/MM/YYYY', // For any other date, also display as "DD/MM/YYYY"
  });

  const theUser = {
    username: isSameUser ? chat.receiver.username : chat.sender.username,
    _id: isSameUser ? chat.receiver._id : chat.sender._id,
    profilePhoto: isSameUser
      ? chat.receiver.profilePhoto
      : chat.sender.profilePhoto,
    dob: isSameUser ? chat.receiver.dob : chat.sender.dob,
    isOnline: isSameUser ? chat.receiver.isOnline : chat.sender.isOnline,
    messageId: chat._id,
    isFromMychats: true,
    isViewed: chat.isViewed,
    senderId: chat.sender._id,
    receiverId: chat.receiver._id,
  };

  return (
    <View className="w-screen self-center border-b border-gray-200 h-[60] justify-center">
      <TouchableOpacity
        className="w-[90%] self-center flex-row justify-between"
        onPress={() =>
          router.push({
            pathname: '/dashboard/chat',
            params: {user: JSON.stringify(theUser)},
          })
        }>
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
          // onPress={() => router.push('/dashboard/user-details')}
          >
            <Image
              source={
                isSameUser
                  ? {uri: chat.receiver.profilePhoto.url}
                  : {uri: chat.sender.profilePhoto.url}
              }
              className="h-[45] w-[45] rounded-3xl"
              resizeMode="cover"
            />
          </TouchableOpacity>

          <View>
            <Text
              className="text-black font-sans font-bold text-lg capitalize"
              style={{color: themeColor.text}}>
              {isSameUser ? chat.receiver.username : chat.user.name}
            </Text>
            <View className="flex-row gap-2 items-center">
              {isSameUser && (
                <Ionicons
                  name={chat.received === true ? 'checkmark-done' : 'checkmark'}
                  size={15}
                  color="black"
                  style={{fontWeight: 'bold'}}
                />
              )}
              <Text
                className={`${
                  !isSameUser && chat.received === false && 'text-sm font-bold'
                } text-gray font-sans`}
                style={{color: themeColor.text, maxWidth: 250}}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {chat.text || 'Sent a file'}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-col items-center">
          <Text
            style={{
              color:
                !isSameUser && chat.unreadCount !== 0
                  ? '#d4b300'
                  : themeColor.text,
            }}
            className="text-sm font-sans">
            {formatTime}
          </Text>
          {!isSameUser && chat.unreadCount !== 0 && (
            <View className="bg-app-default rounded-xl w-[20] h-[20]">
              <Text className="text-center text-white font-sans text-sm">
                {chat.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default function ChatMainScreen() {
  const router = useRouter();
  const {themeColor} = useGlobalStore(state => state);
  const {currentUser, isConnected} = useUserStore(state => state);

  const {
    isSuccess,
    isLoading: isLoadingChats,
    isFetching,
    isError,
    error,
    refetch,
    data: chatsData,
  } = apiHookRequester.useFetchData(
    currentUser._id ? `/api/v1/user/mychats/${currentUser?._id}` : '',
    'mychats',
  );

  useEffect(() => {
    dismissAllNotifications();
  }, []);
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );
  const renderItem = ({item}: {item: AppListType}) => {
    return <MyChats chat={item} refetchUsers={refetch} />;
  };

  const renderFooter = () => {
    console.log(error, 'err users');
    const {message, code} = (error as any)?.data || {};
    const {chatMessage, userCode} = chatsData?.data || {};

    if (isLoadingChats || isFetching)
      return (
        <View style={{paddingVertical: 20, marginTop: 80, alignSelf: 'center'}}>
          <AppLoader />
        </View>
      );
    return (
      <View style={{paddingVertical: 20, marginTop: 80}}>
        <Text
          className="text-base font-sans text-center"
          style={{color: themeColor.text}}>
          {message || chatMessage}
        </Text>
      </View>
    );
  };
  const {chats} = chatsData?.data || [];
  console.log(chats, 'list for chats');
  return (
    <AppContainer>
      <View className="flex-1">
        <View className="mb-3">
          <Text className="screen-title">Recent Chats</Text>
        </View>

        <View className="flex-1">
          <AppList
            data={isFetching ? [] : chats}
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
      </View>
    </AppContainer>
  );
}
