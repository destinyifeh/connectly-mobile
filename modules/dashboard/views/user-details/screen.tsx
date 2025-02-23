import {AppContainer} from '@/components/AppContainer';
import {currentDeviceWidth} from '@/constants/Styles';
import {formatTodaysDate, getUserCurrentAge} from '@/helpers/formatters';
import {apiHookRequester} from '@/services/api/hooks';
import {useGlobalStore} from '@/stores/global-store';
import {useUserStore} from '@/stores/user-store';
import {Entypo, Feather, Ionicons, Octicons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import {useFocusEffect, useLocalSearchParams, useRouter} from 'expo-router';
import * as SMS from 'expo-sms';
import {useCallback, useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {SlideInRight, SlideOutRight} from 'react-native-reanimated';
import {Toast} from 'toastify-react-native';
export const UserDetailsScreen = () => {
  const router = useRouter();

  const [isReporting, setIsReporting] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {themeColor} = useGlobalStore(state => state);
  const {userId, userInfo} = useLocalSearchParams();
  const {currentUser} = useUserStore(state => state);
  const theUser = userInfo ? JSON.parse(userInfo as string) : null;

  console.log(theUser, 'Parsed User Info');

  const reportUserRequester = apiHookRequester.useUpdateData(
    `/api/v1/user/report/${theUser._id}`,
  );
  const {mutate} = apiHookRequester.usePostData(
    `/api/v1/user/notify/${currentUser?._id}`,
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsModalVisible(false);
      };
    }, []),
  );
  useEffect(() => {
    notify();
  }, []);

  const notify = () => {
    const payload = {
      from: currentUser._id,
      to: theUser._id,
      title: 'Visited your profile',
      body: currentUser.username + ' ' + 'is interested in you',
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
  const handleSms = async () => {
    // Check if SMS is available on the device
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const recipients = ['09033662731'];
      const message = 'Hello, this is a test message.';

      // Send the SMS
      const {result} = await SMS.sendSMSAsync(recipients, message);
      if (result === 'sent') {
        console.log('SMS sent successfully.');
      } else if (result === 'cancelled') {
        console.log('SMS sending was cancelled.');
      } else {
        console.log('SMS sending result is unknown.');
      }
    } else {
      console.log('SMS is not available on this device.');
    }
  };

  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onReport = () => {
    setIsReporting(true);
    const reporterIdentity = {
      username: currentUser.username,
      _id: currentUser._id,
      email: currentUser.email,
      phone: currentUser.phone,
      dateOfReport: formatTodaysDate(),
    };
    console.log(reporterIdentity, 'identity');

    reportUserRequester.mutate(reporterIdentity, {
      onSuccess(data, variables, context) {
        console.log(data, 'data');
        const {message} = data.data;
        Toast.success(message, 'bottom');
      },
      onError(error: any, variables, context) {
        console.log(error, 'err');
        const {message} = error.data || {};
        Toast.error(
          message || 'Oops! Something went wrong, please try again later',
          'bottom',
        );
      },
      onSettled(data, error, variables, context) {
        console.log(data, 'settled');
        setIsReporting(false);
      },
    });
  };
  return (
    <AppContainer>
      <View className="border-b-2 border-b-[#f3f3f4] w-screen self-center py-[0.5]">
        <View
          className="flex-row items-center justify-between self-center"
          style={{width: currentDeviceWidth * 0.9}}>
          <View className="flex-row items-center gap-2">
            <TouchableOpacity onPress={() => router.back()}>
              <Feather name="arrow-left" size={16} color={themeColor.text} />
            </TouchableOpacity>
            <View className="flex-row gap-2 items-center">
              <Text
                className="text-black font-sans font-bold text-lg capitalize"
                style={{color: themeColor.text}}>
                {theUser.username}, {''}
                {getUserCurrentAge(theUser.dob)}
              </Text>

              <Octicons
                name="dot-fill"
                size={13}
                color={theUser.isOnline ? 'green' : 'gray'}
              />
            </View>
          </View>
          <TouchableOpacity onPress={handleModal}>
            <Entypo
              name="dots-three-vertical"
              size={16}
              color={themeColor.text}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className=""
        contentContainerClassName="pb-[50]"
        showsVerticalScrollIndicator={false}>
        <View className="my-3 w-full">
          <ImageBackground
            source={{uri: theUser.profilePhoto?.url}}
            imageStyle={{
              borderRadius: 15,
            }}
            resizeMode="cover"
            style={{width: currentDeviceWidth * 0.9, height: 300}}>
            <LinearGradient
              colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.2)']}
              style={{flex: 1, borderRadius: 15}}>
              <View className="absolute bottom-5 px-2">
                <Text className="text-white font-sans font-bold text-lg capitalize">
                  {theUser.username}, {''}
                  {getUserCurrentAge(theUser.dob)}
                </Text>
                <View className="flex-row items-center">
                  <Ionicons name="location-sharp" size={10} color="#fff" />
                  <Text className="text-white font-sans text-sm">
                    {theUser.city}, {theUser.state}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        <View>
          <View className="mt-5">
            <Text
              className="screen-title text-lg"
              style={{color: themeColor.text}}>
              Hobbies
            </Text>

            <View className="p-2 flex-row gap-2 flex-wrap">
              {theUser.hobbies.map((hobby: string) => (
                <View
                  className="bg-app-default min-w-[20] px-5 h-[40] justify-center rounded-[25]"
                  key={hobby}>
                  <Text className="text-base text-black font-sans capitalize">
                    {hobby}
                  </Text>
                </View>
              ))}
            </View>

            <View className="mt-5">
              <Text
                className="screen-title text-lg"
                style={{color: themeColor.text}}>
                Photos
              </Text>

              <ScrollView
                className="mt-3"
                contentContainerClassName="flex-row gap-3"
                horizontal
                showsHorizontalScrollIndicator={false}>
                {theUser.otherPhotos?.length > 0 ? (
                  theUser.otherPhotos.map(
                    (photo: {url: string; id: string}) => (
                      <View key={photo.url}>
                        <Image
                          source={{uri: photo.url}}
                          resizeMode="cover"
                          alt={theUser.username + ' ' + 'photo'}
                          style={{width: 250, height: 200, borderRadius: 10}}
                        />
                      </View>
                    ),
                  )
                ) : (
                  <Text>No Photo available</Text>
                )}
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-8 flex-row gap-5 self-center items-center">
        <TouchableOpacity
          onPress={() => Linking.openURL(`https://wa.me/${'09033662731'}`)}>
          <Image
            source={require('../../../../assets/images/whatsapp-icon.png')}
            style={{width: 55, height: 55}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(`mailto:${'destechofficial@gmail.com'}`)
          }>
          <Image
            source={require('../../../../assets/images/email-logo.png')}
            style={{width: 52, height: 52}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL(`tel:${'09033662731'}`)}>
          <Image
            source={require('../../../../assets/images/call-icon.png')}
            style={{width: 50, height: 50}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSms}>
          <Image
            source={require('../../../../assets/images/sms-icon.png')}
            style={{width: 34, height: 34}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: '/dashboard/chat',
            params: {user: userInfo},
          })
        }>
        <Text className="screen-title">chat</Text>
      </TouchableOpacity>
      {isModalVisible === true && (
        <Animated.View
          entering={SlideInRight.duration(500)}
          exiting={SlideOutRight.duration(500)}
          className="absolute right-0 top-[10.4%] p-2 bg-app-default min-h-[5%] min-w-[20%] mr-1 rounded-lg z-10 ">
          <View className="">
            <TouchableOpacity disabled={isReporting} onPress={onReport}>
              <Text className="text-black font-sans text-lg font-bold text-center">
                {isReporting ? 'Reporting..' : 'Report'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </AppContainer>
  );
};
