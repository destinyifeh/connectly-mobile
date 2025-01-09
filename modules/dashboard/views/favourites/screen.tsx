import {AppContainer} from '@/components/AppContainer';
import {APP_DEFAULT_COLOUR} from '@/constants/Styles';
import {FontAwesome, Ionicons, Octicons} from '@expo/vector-icons';
import {useIsFocused} from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import {useFocusEffect, useNavigation, useRouter} from 'expo-router';
import {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
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

export const FavScreen = () => {
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;
  const [isSelected, setIsSelected] = useState<string>('');

  const isFocused = useIsFocused();

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

  return (
    <AppContainer
      barColor="dark-content"
      showBackButton
      showScreenTitle
      title="Favourites">
      <View className="flex-1">
        <View className="mt-3">
          <ActiveUsers />
          <ActiveUsers />
          <ActiveUsers />
        </View>
      </View>
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
