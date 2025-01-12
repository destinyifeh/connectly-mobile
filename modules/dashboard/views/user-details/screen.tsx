import {AppContainer} from '@/components/AppContainer';
import {currentDeviceWidth} from '@/constants/Styles';
import {useGlobalStore} from '@/stores/global-store';
import {Entypo, Feather, Ionicons, Octicons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import {useFocusEffect, useRouter} from 'expo-router';
import * as SMS from 'expo-sms';
import {useCallback, useState} from 'react';
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
export const UserDetailsScreen = () => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {themeColor} = useGlobalStore(state => state);
  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsModalVisible(false);
      };
    }, []),
  );

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
                className="text-black font-sans font-bold text-lg"
                style={{color: themeColor.text}}>
                Anita, 25
              </Text>

              <Octicons name="dot-fill" size={13} color="green" />
            </View>
          </View>
          <TouchableOpacity onPress={handleModal}>
            <Entypo name="dots-three-vertical" size={16} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className=""
        contentContainerClassName="pb-[50]"
        showsVerticalScrollIndicator={false}>
        <View className="my-3 w-full">
          <ImageBackground
            source={require('../../../../assets/images/couple_bg.jpg')}
            imageStyle={{
              borderRadius: 15,
            }}
            resizeMode="cover"
            style={{width: currentDeviceWidth * 0.9, height: 300}}>
            <LinearGradient
              colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.2)']}
              style={{flex: 1, borderRadius: 15}}>
              <View className="absolute bottom-5 px-2">
                <Text className="text-white font-sans font-bold text-lg">
                  Jones, 34
                </Text>
                <View className="flex-row items-center">
                  <Ionicons name="location-sharp" size={10} color="#fff" />
                  <Text className="text-white font-sans text-sm">
                    Ikorodu,Lagos
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
              <View className="bg-app-default min-w-[20] px-5 h-[40] justify-center rounded-[25]">
                <Text className="text-base text-black font-sans">Dancing</Text>
              </View>
              <View className="bg-app-default min-w-[20] px-5 h-[40] justify-center rounded-[25]">
                <Text className="text-base text-black font-sans">Chatting</Text>
              </View>
              <View className="bg-app-default min-w-[20] px-5 h-[40] justify-center rounded-[25]">
                <Text className="text-base text-black font-sans">Cooking</Text>
              </View>
              <View className="bg-app-default min-w-[20] px-5 h-[40] justify-center rounded-[25]">
                <Text className="text-base text-black font-sans">reading</Text>
              </View>
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
                <Image
                  source={require('../../../../assets/images/couple_bg.jpg')}
                  resizeMode="cover"
                  alt="Anita photo"
                  style={{width: 250, height: 200, borderRadius: 10}}
                />
                <Image
                  source={require('../../../../assets/images/couple_bg.jpg')}
                  resizeMode="cover"
                  style={{width: 250, height: 200, borderRadius: 10}}
                />
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
      {isModalVisible === true && (
        <Animated.View
          entering={SlideInRight.duration(500)}
          exiting={SlideOutRight.duration(500)}
          className="absolute right-0 top-[10.4%] p-2 bg-app-default min-h-[5%] w-[30%] mr-1 rounded-lg z-10 ">
          <View className="">
            <TouchableOpacity>
              <Text className="text-black font-sans text-lg font-bold text-center">
                Report
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </AppContainer>
  );
};
