import {AppContainer} from '@/components/AppContainer';
import {AppBottomSheet} from '@/components/BottomSheet';
import {APP_DEFAULT_COLOUR} from '@/constants/Styles';
import {useGlobalStore} from '@/stores/global-store';
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
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActionSheetRef} from 'react-native-actions-sheet';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {HomeFilter} from './components/filter';
const deviceWidth = Dimensions.get('window').width;
const deviceHight = Dimensions.get('window').height;
const ActiveUsers = () => {
  const router = useRouter();

  return (
    <View className="flex-row gap-2 items-center self-center my-1">
      <TouchableOpacity
        //onPress={onUpload}
        onPressIn={() =>
          router.push({
            pathname: '/dashboard/user-details',
            params: {userId: 3333},
          })
        }>
        <ImageBackground
          imageStyle={{borderRadius: 15}}
          style={{width: deviceWidth * 0.45, height: 220, borderRadius: 15}}
          source={require('../../../../assets/images/couple_bg.jpg')}>
          <LinearGradient
            colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.3)']}
            style={{flex: 1, borderRadius: 15}}>
            <TouchableOpacity className="self-end p-2">
              <FontAwesome name="heart-o" size={18} color="white" />
            </TouchableOpacity>
            <View className="absolute bottom-5 px-2">
              <View className="flex-row gap-1 items-center">
                <Text className="text-white font-sans font-bold text-lg">
                  Anita, 25
                </Text>
                <View className="bg-white w-[10] h-[10] rounded-3xl items-center justify-center ">
                  <Octicons
                    name="dot-fill"
                    size={13}
                    color="green"
                    className="bottom-[1.9]"
                  />
                </View>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="location-sharp" size={10} color="#fff" />
                <Text className="text-white font-sans text-sm">
                  Ikorodu,Lagos
                </Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity>
        <ImageBackground
          imageStyle={{borderRadius: 15}}
          style={{width: deviceWidth * 0.45, height: 220, borderRadius: 15}}
          source={require('../../../../assets/images/couple_bg.jpg')}>
          <LinearGradient
            colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.3)']}
            style={{flex: 1, borderRadius: 15}}>
            <TouchableOpacity className="self-end p-2">
              <FontAwesome name="heart" size={18} color={APP_DEFAULT_COLOUR} />
            </TouchableOpacity>
            <View className="absolute bottom-5 px-2">
              <Text className="text-white font-sans font-bold text-lg">
                Jones, 34
              </Text>
              <View className="flex-row items-center">
                <Ionicons
                  name="location-sharp"
                  size={10}
                  color={APP_DEFAULT_COLOUR}
                />
                <Text className="text-white font-sans text-sm">
                  Ikorodu,Lagos
                </Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
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
  const {themeColor} = useGlobalStore(state => state);
  console.log(isFocused, 'idffoooo');
  useEffect(() => {
    setIsSelected('foryou');
  }, []);

  useFocusEffect(
    // Callback should be wrapped in `React.useCallback` to avoid running the effect too often.
    useCallback(() => {
      // Invoked whenever the route is focused.
      console.log('Hello!');

      // Return function is invoked whenever the route gets out of focus.
      return () => {
        console.log('This route is now unfocused.');
      };
    }, []),
  );

  const handleSelectedNav = (selected: string) => {
    console.log(selected, 'sssss');
    setIsSelected(selected);
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
    setIsSelected('foryou');
  };

  const openFilter = () => {
    setIsSelected('fil');
    actionSheetRef.current?.show();
  };

  const handleAppyFilter = () => {
    const payload = {
      maxAge: maxAge,
      minAge: minAge,
      gender: isFilterGender,
    };
    console.log(payload, 'fil pay');
    setIsLoadingFilter(true);
    setTimeout(() => {
      setIsLoadingFilter(false);
      closeFilter();
    }, 5000);
  };

  return (
    <AppContainer barColor="dark-content">
      <View className="flex-1">
        <View className="flex-row justify-between items-center">
          {image ? (
            <TouchableOpacity
              onPress={() => router.push('/dashboard/profile')}
              className="bg-app-ghost rounded-[25] w-[45] h-[45] justify-center items-center">
              <FontAwesome6 name="user-large" size={25} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => router.push('/dashboard/profile')}>
              <Image
                source={require('../../../../assets/images/couple_bg.jpg')}
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
            <MaterialIcons name="notifications" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center gap-3 px-2 mt-3 self-center">
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
              Favorites
            </Text>
          </TouchableOpacity>
        </View>
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
        <View className="mt-5">
          <ActiveUsers />
          <ActiveUsers />
          <ActiveUsers />
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
