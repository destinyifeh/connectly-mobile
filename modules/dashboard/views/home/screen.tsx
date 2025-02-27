import {AppContainer} from '@/components/AppContainer';
import {AppLoader} from '@/components/AppLoader';
import {AppBottomSheet} from '@/components/BottomSheet';
import AppList from '@/constants/AppPackages';
import {APP_DEFAULT_COLOUR} from '@/constants/Styles';
import {AppListType, CurrentUserProps} from '@/constants/types';
import {getUserCurrentAge} from '@/helpers/formatters';
import {apiHookRequester} from '@/services/api/hooks';
import {useGlobalStore} from '@/stores/global-store';
import {useUserStore} from '@/stores/user-store';
import {
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from '@expo/vector-icons';
import {useIsFocused} from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import {useFocusEffect, useRouter} from 'expo-router';
import {FC, useCallback, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActionSheetRef} from 'react-native-actions-sheet';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {Toast} from 'toastify-react-native';
import {HomeFilter} from './components/filter';
const deviceWidth = Dimensions.get('window').width;
const deviceHight = Dimensions.get('window').height;

type ActiveUsersProps = {
  item: CurrentUserProps;
};
type FilType = {
  gender?: string;
  minAge?: number;
  maxAge?: number;
};
const ActiveUsers: FC<AppListType> = ({user, refetchUsers, isSelected}) => {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const {currentUser, setCurrentUser} = useUserStore(state => state);
  const {mutate} = apiHookRequester.useUpdateData(
    `/api/v1/user/add-to-favourites/${currentUser?._id}`,
  );

  const onFavourite = (user: string) => {
    const payload = {
      user: user,
    };
    setIsAdding(true);

    mutate(payload, {
      onSuccess(data, variables, context) {
        console.log(data);
        const {message, user} = data.data || {};
        console.log(user, 'userme');
        Toast.success(message, 'bottom');
        setCurrentUser(user);
        console.log(currentUser, 'curret');
        if (isSelected === 'fav') {
          refetchUsers();
        }
      },
      onError(error: any, variables, context) {
        console.log(error, 'fav err');
        const {message} = error.data || {};
        Toast.error(message, 'bottom');
      },
      onSettled(data, error, variables, context) {
        console.log(data, 'settled');
        setIsAdding(false);
      },
    });
  };

  const isFavourite = currentUser.favourites?.includes(user._id);
  console.log(isFavourite, 'isFav');
  console.log(isFavourite, 'isFav');
  return (
    <View className="mb-[8] mx-auto">
      <Pressable
        onPress={() =>
          router.push({
            pathname: '/dashboard/user-details',
            params: {
              userInfo: JSON.stringify(user),
              previousScreen: 'Dashboard',
            },
          })
        }>
        <ImageBackground
          imageStyle={{borderRadius: 15}}
          style={{width: deviceWidth * 0.43, height: 220, borderRadius: 15}}
          source={{uri: user.profilePhoto.url}}
          resizeMode="cover">
          <LinearGradient
            colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.3)']}
            style={{flex: 1, borderRadius: 15}}>
            <TouchableOpacity
              disabled={isAdding}
              className="self-end p-2"
              onPress={() => onFavourite(user._id)}>
              <FontAwesome
                name="heart-o"
                size={18}
                color={isFavourite ? APP_DEFAULT_COLOUR : 'white'}
              />
            </TouchableOpacity>
            <View className="absolute bottom-5 px-2">
              <View className="flex-row gap-2 items-center">
                <View className="flex-row gap-1 items-center">
                  <Text
                    className="text-white font-sans font-bold text-lg max-w-[120] capitalize"
                    ellipsizeMode="tail"
                    numberOfLines={1}>
                    {user.username},
                  </Text>
                  <Text className="text-white font-sans font-bold text-lg">
                    {getUserCurrentAge(user.dob)}
                  </Text>
                </View>
                <View className="bg-white w-[10] h-[10] rounded-3xl items-center justify-center ">
                  {user.isOnline ? (
                    <Octicons
                      name="dot-fill"
                      size={13}
                      color="green"
                      className="bottom-[1.9]"
                    />
                  ) : (
                    <Octicons
                      name="dot-fill"
                      size={13}
                      color="gray"
                      className="bottom-[1.9]"
                    />
                  )}
                </View>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="location-sharp" size={10} color="#fff" />
                <Text className="text-white font-sans text-sm">
                  {isSelected === 'nearby' ? user.city : user.state}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    </View>
  );
};

export const DashboardHomeScreen = () => {
  const router = useRouter();
  const width = Dimensions.get('window').width;
  const [isSelected, setIsSelected] = useState<string>('');
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const isFocused = useIsFocused();
  const [isFilterGender, setIsFilterGender] = useState<string>('');
  const [minAge, setMinAge] = useState<number>(18);
  const [maxAge, setMaxAge] = useState<number>(50);
  const [isLoadingFilter, setIsLoadingFilter] = useState<boolean>(false);
  const {themeColor, notificationToken} = useGlobalStore(state => state);
  const [isTopNavVisible, setIsTopNavVisible] = useState(false);
  const [notificationCounter, setNotificationCounter] = useState(0);
  const [isFil, setIsFil] = useState(false);
  const [filPayload, setFilPayload] = useState<FilType>({});
  const {currentUser, isConnected, currentUserLocation} = useUserStore(
    state => state,
  );
  console.log(isFocused, 'idffoooo');
  console.log(currentUser, 'current boss');
  //const onlineUser = useUserOnline();
  //console.log(onlineUser, 'user isOnline');
  const params = new URLSearchParams();
  const {
    isSuccess,
    isLoading: isLoadingUsers,
    isFetching,
    isError,
    error,
    refetch,
    data: usersData,
  } = apiHookRequester.useFetchData(
    isSelected
      ? `/api/v1/active-users/${currentUser?._id}?query=${isSelected}&gender=${filPayload.gender}&minAge=${filPayload.minAge}&maxAge=${filPayload.maxAge}`
      : '',
    'activeUsers',
  );
  const pushToken = apiHookRequester.usePostData(
    `/api/v1/user/push-token/${currentUser?._id}`,
  );

  const {
    error: countErr,
    refetch: refetchCount,
    data: notificationCountData,
  } = apiHookRequester.useFetchData(
    `/api/v1/user/notifications-count/${currentUser?._id}`,

    'countNotifications',
  );

  const updateAdressRequest = apiHookRequester.useUpdateData(
    `/api/v1/user/update/${currentUser?._id}`,
  );

  useEffect(() => {
    setIsSelected('foryou');
    postPushToken();
    updateUserAdress();
  }, []);

  useEffect(() => {
    if (isSelected && isFocused) {
      refetch();
    }
  }, [isSelected, isFocused]);

  useFocusEffect(
    useCallback(() => {
      refetchCount();
      console.log(countErr, 'count errr');
      console.log(notificationCountData, 'count data');

      if (notificationCountData?.data?.code !== '200') {
        console.log(countErr, 'count errr');
        setNotificationCounter(0);
        return;
      }

      const {notificationCount} = notificationCountData?.data || {};
      console.log(notificationCount, 'noteCounter...');
      setNotificationCounter(notificationCount);
    }, [refetchCount, notificationCountData?.data, notificationCounter]),
  );

  const postPushToken = () => {
    if (!notificationToken) {
      console.log('No token available');
      return false;
    }
    const payload = {
      token: notificationToken,
    };
    pushToken.mutate(payload, {
      onSuccess(data, variables, context) {
        console.log(data, 'push data');
      },
      onError(error, variables, context) {
        console.log(error, 'push err');
      },
    });
  };

  const updateUserAdress = () => {
    if (currentUserLocation.city === undefined) {
      console.log('No currentUserLocation');
      return false;
    }
    const payload = {
      ...currentUserLocation,
    };
    console.log('address-update', payload);
    updateAdressRequest.mutate(payload, {
      onSuccess(data, variables, context) {
        console.log(data, 'updated-address');
      },
      onSettled(data, error, variables, context) {
        console.log('address-update', error);
      },
    });
  };

  const handleSelectedNav = (selected: string) => {
    console.log(selected, 'sssss');
    setIsSelected(selected);
    setIsFil(false);
  };
  const image = false;

  const datas = [
    {
      img: require('../../../../assets/images/couple_bg.jpg'),
      id: 1,
    },
    {
      img: require('../../../../assets/images/couple_bg.jpg'),
      id: 2,
    },
  ];

  const appAd = () => {
    return (
      <SwiperFlatList
        style={{marginBottom: 20, marginTop: 20, borderRadius: 15}}
        autoplay
        autoplayLoop
        data={datas}
        index={0}
        autoplayDelay={10}
        showPagination={true}
        paginationStyle={{top: 132}}
        paginationStyleItemActive={{
          width: 7,
          height: 7,
          borderRadius: 6.58,
          backgroundColor: 'green',
          marginLeft: 3,
          marginRight: 3,
        }}
        paginationStyleItemInactive={{
          backgroundColor: '#D9D9D9',
        }}
        paginationStyleItem={{
          width: 7,
          height: 7,
          borderRadius: 6.58,
          marginLeft: 3,
          marginRight: 3,
        }}
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              width: width,
            }}>
            {/* {loadingAd && (
        <AdSkeletonLoader
          height={137}
          width={width * 0.9}
          borderRadius={10}
        />
      )} */}
            <Image
              source={item.img}
              resizeMode="cover"
              style={styles.bannerContainer}
              //onLoad={() => setLoadingAd(false)}
            />
          </TouchableOpacity>
        )}
      />
    );
  };

  const closeFilter = () => {
    actionSheetRef.current?.hide();
    setIsFil(prev => !prev);
    setIsSelected('foryou');
  };

  const closeFilterOnApply = () => {
    actionSheetRef.current?.hide();
    setIsSelected('fil');
  };

  const openFilter = () => {
    console.log('herre');
    setIsFil(true);
    actionSheetRef.current?.show();
  };

  const handleAppyFilter = () => {
    const payload = {
      maxAge: maxAge,
      minAge: minAge,
      gender: isFilterGender,
    };
    setFilPayload(payload);
    console.log(payload, 'fil pay');
    closeFilterOnApply();
    // setIsLoadingFilter(true);
    // setTimeout(() => {
    //   setIsLoadingFilter(false);
    //   closeFilterOnApply();
    // }, 5000);
  };

  const onRefresh = () => {
    refetch();
    refetchCount();
  };

  const renderFooter = () => {
    console.log(error, 'err users');
    const {message, code} = (error as any)?.data || {};
    const {userMessage, userCode} = usersData?.data || {};

    if (isLoadingUsers || isFetching)
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
          {message || userMessage}
        </Text>
      </View>
    );
  };

  const {users} = usersData?.data || [];
  console.log(users, 'list for users');

  const renderItem = ({item}: {item: AppListType}) => {
    return (
      <ActiveUsers user={item} refetchUsers={refetch} isSelected={isSelected} />
    );
  };
  const theCounter = notificationCounter > 99 ? '99+' : notificationCounter;
  const foryouBg = isSelected === 'foryou' ? 'bg-app-default' : 'bg-app-ghost';
  const nearbyBg = isSelected === 'nearby' ? 'bg-app-default' : 'bg-app-ghost';
  const favBg = isSelected === 'fav' ? 'bg-app-default' : 'bg-app-ghost';
  const filBg = isSelected === 'fill' ? 'bg-app-default' : 'bg-app-ghost';
  return (
    <AppContainer barColor="dark-content">
      <View className="flex-1">
        <View className="flex-row justify-between items-center">
          {!currentUser?.profilePhoto?.url ? (
            <TouchableOpacity
              onPress={() => router.push('/dashboard/profile')}
              className="bg-app-ghost rounded-[25] w-[45] h-[45] justify-center items-center">
              <FontAwesome6 name="user-large" size={25} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => router.push('/dashboard/profile')}>
              <Image
                source={{uri: currentUser.profilePhoto.url}}
                style={{width: 45, height: 45, borderRadius: 25}}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
          <Text
            className="screen-title text-3xl"
            style={{color: themeColor.text}}>
            Connectly
          </Text>

          <TouchableOpacity
            onPress={() => router.push('/dashboard/user-notification')}
            className="bg-app-ghost rounded-[25] w-[45] h-[45] justify-center items-center">
            <View className="absolute top-1 z-5 left-8 ">
              <Text className="text-app-default font-sans font-bold text-base">
                {notificationCounter == 0 ? null : theCounter}
              </Text>
            </View>
            <MaterialIcons name="notifications" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {isTopNavVisible && (
          <View className="flex-row items-center gap-3 px-2 mt-5 self-center">
            <TouchableOpacity
              onPress={openFilter}
              className={`${
                isSelected === 'fil' ? 'bg-app-default' : 'bg-app-ghost '
              } px-5 rounded-[25] min-w-[45] h-[40] justify-center items-center`}>
              <MaterialCommunityIcons
                size={24}
                name="tune-variant"
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSelectedNav('foryou')}
              className={`${
                isSelected === 'foryou' ? 'bg-app-default' : 'bg-app-ghost'
              } px-5 rounded-[25] min-w-[45] h-[40] justify-center items-center`}>
              <Text className="text-lg text-black font-bold font-sans">
                For you
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSelectedNav('nearby')}
              className={`${
                isSelected === 'nearby' ? 'bg-app-default' : 'bg-app-ghost'
              } px-5 rounded-[25] min-w-[45] h-[40] justify-center items-center`}>
              <Text className="text-lg text-black font-bold font-sans">
                Nearby
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleSelectedNav('fav')}
              className={`${
                isSelected === 'fav' ? 'bg-app-default' : 'bg-app-ghost'
              } px-5 rounded-[25] min-w-[45] h-[40] justify-center items-center`}>
              <Text className="text-lg text-black font-bold font-sans">
                Favourites
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View className="">
          {/* <Carousel
            style={{
              width: width * 0.9,

              alignSelf: 'center',
            }}
            width={width}
            data={datas}
            height={300}
            autoPlay={true}
            scrollAnimationDuration={1000}
            pagingEnabled
            autoPlayInterval={1000}
            renderItem={({item}) => {
              return (
                <View className="">
                  <Image
                    source={item.img}
                    style={{
                      width: width * 0.9,
                      height: 105,
                      borderRadius: 10,
                    }}
                    resizeMode="cover"
                  />
                </View>
              );
            }}
          /> */}
          {/* {appAd()} */}
        </View>
        <View className="flex-1">
          <AppList
            data={isFetching ? [] : users}
            renderItem={renderItem}
            estimatedItemSize={200}
            numColumns={2}
            contentContainerStyle={{paddingBottom: 10}}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderFooter}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={onRefresh}
                colors={[APP_DEFAULT_COLOUR]}
              />
            }
            ListHeaderComponent={
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className=""
                contentContainerClassName="flex-row items-center gap-3 px-2 mt-5 self-center mb-5">
                <TouchableOpacity
                  disabled={isFil}
                  onPress={openFilter}
                  className={`${
                    isFil ? 'bg-app-default' : 'bg-app-ghost'
                  } px-5 rounded-[25] min-w-[45] h-[40] justify-center items-center`}>
                  <MaterialCommunityIcons
                    size={24}
                    name="tune-variant"
                    color="black"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleSelectedNav('foryou')}
                  className={`${
                    isFil ? 'bg-app-ghost' : foryouBg
                  } px-5 rounded-[25] min-w-[45] h-[40] justify-center items-center`}>
                  <Text className="text-lg text-black font-bold font-sans">
                    For you
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleSelectedNav('nearby')}
                  className={`${
                    isFil ? 'bg-app-ghost' : nearbyBg
                  } px-5 rounded-[25] min-w-[45] h-[40] justify-center items-center`}>
                  <Text className="text-lg text-black font-bold font-sans">
                    Nearby
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleSelectedNav('fav')}
                  className={`${
                    isFil ? 'bg-app-ghost' : favBg
                  } px-5 rounded-[25] min-w-[45] h-[40] justify-center items-center`}>
                  <Text className="text-lg text-black font-bold font-sans">
                    Favourites
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            }
          />
        </View>
      </View>

      <AppBottomSheet
        ref={actionSheetRef}
        closeOnDragDown={false}
        closeOnTouchBackdrop={false}
        containerStyle={{
          height: deviceHight * 0.4,
          backgroundColor: themeColor.background,
        }}>
        <HomeFilter
          closeFilter={closeFilter}
          minAge={minAge}
          maxAge={maxAge}
          isLoadingFilter={isLoadingFilter}
          handleApplyFilter={handleAppyFilter}
          setMaxAge={setMaxAge}
          setMinAge={setMinAge}
          isFilterGender={isFilterGender}
          setIsFilterGender={setIsFilterGender}
        />
      </AppBottomSheet>
    </AppContainer>
  );
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  bannerContainer: {
    width: width,
    height: 120,
    borderRadius: 10,
  },
  paginationStyle: {
    bottom: 10,
  },
});
