import {AppContainer} from '@/components/AppContainer';
import {currentDeviceWidth} from '@/constants/Styles';
import {globalStore} from '@/stores/global-store';
import {Entypo, Feather, Octicons} from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Animated, {SlideInRight, SlideOutRight} from 'react-native-reanimated';
import {ChatForm} from './components/form';

export const ChatScreen = () => {
  const [form, setForm] = useState({email: ''});
  const {themeColor} = globalStore(state => state);

  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <AppContainer barColor="dark-content">
      <View className="border-b-2 border-b-[#f3f3f4] w-screen self-center py-[0.5]">
        <View
          className="flex-row items-center justify-between self-center"
          style={{width: currentDeviceWidth * 0.9}}>
          <View className="flex-row items-center gap-2">
            <TouchableOpacity onPress={() => router.back()}>
              <Feather name="arrow-left" size={16} color={themeColor.text} />
            </TouchableOpacity>
            <View className="flex-row gap-2 items-center">
              <Image
                source={require('./../../../../assets/images/couple_bg.jpg')}
                className="w-[30] h-[30] rounded-[15]"
                resizeMode="cover"
              />
              <Text
                className="text-black font-sans font-bold text-lg"
                style={{color: themeColor.text}}>
                Anita, 25
              </Text>

              <Octicons name="dot-fill" size={13} color="green" />
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
      <ChatForm />
      {isModalVisible === true && (
        <Animated.View
          entering={SlideInRight.duration(500)}
          exiting={SlideOutRight.duration(500)}
          className="absolute right-0 top-[3.5%] p-2 bg-app-default min-h-[5%] w-[30%] mr-1 rounded-lg z-10 ">
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
