import {AppContainer} from '@/components/AppContainer';
import {AppUploader} from '@/constants/AppUploader';
import {currentDeviceWidth} from '@/constants/Styles';
import {Entypo, Ionicons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import {useFocusEffect, useRouter} from 'expo-router';
import {useCallback, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActionSheetRef} from 'react-native-actions-sheet';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
export const ProfileScreen = () => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMainPhotoModalVisible, setIsMainPhotoModalVisible] = useState(false);
  const [fileObject, setFileObject] = useState<object>({});
  const [selectedImage, setSelectedImage] = useState<string>('');
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [imageType, setImageType] = useState<string>('');

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsMainPhotoModalVisible(false);
        setIsModalVisible(false);
      };
    }, []),
  );

  const onUpload = (imageType: string) => {
    actionSheetRef.current?.show();
    setImageType(imageType);
    setIsMainPhotoModalVisible(false);
  };

  const onClose = () => {
    actionSheetRef.current?.hide();
    setImageType('');
  };

  const handleSetFile = (file: string) => {
    console.log(selectedImage, 'selctorr');
    console.log(file, 'file');
    setSelectedImage(file);
    onClose();
  };

  const handleFileObject = (file: object) => {
    console.log(file, 'fileoo');
    setFileObject(file);
  };
  const handleSubmit = () => {
    router.push('/login');
  };

  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleMainPhotoModal = () => {
    setIsMainPhotoModalVisible(!isMainPhotoModalVisible);
  };
  return (
    <AppContainer showBackButton showScreenTitle title="Profile">
      <View className="border-b-2 border-b-[#f3f3f4] w-screen self-center py-[0.5]" />

      <ScrollView
        className=""
        contentContainerClassName="pb-[50]"
        showsVerticalScrollIndicator={false}>
        <View className="my-3 w-full">
          <TouchableOpacity
            onPress={handleMainPhotoModal}
            className="absolute top-[3] z-10 right-1 bg-app-default p-1 rounded-[5]">
            <Entypo name="dots-three-vertical" size={16} color="black" />
          </TouchableOpacity>

          {isMainPhotoModalVisible && (
            <Animated.View
              entering={FadeIn.duration(500)}
              exiting={FadeOut.duration(500)}
              className="absolute right-0 top-[50] p-2 bg-app-default min-h-[10%] min-w-[10%] mr-1 rounded-lg z-10 ">
              <View className="">
                <TouchableOpacity onPress={() => onUpload('PROFILE_PHOTO')}>
                  <Text className="text-black font-sans text-lg font-bold text-center">
                    Change
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}
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
            <Text className="screen-title text-lg">Hobbies</Text>

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
              <Text className="screen-title text-lg">Photos</Text>

              <ScrollView
                className="mt-3"
                contentContainerClassName="flex-row gap-3 items-center"
                horizontal
                showsHorizontalScrollIndicator={false}>
                <View>
                  <TouchableOpacity
                    onPress={handleModal}
                    className="absolute top-[3] z-10 right-0 bg-app-default p-1 rounded-[5]">
                    <Entypo
                      name="dots-three-vertical"
                      size={16}
                      color="black"
                    />
                  </TouchableOpacity>

                  {isModalVisible && (
                    <Animated.View
                      entering={FadeIn.duration(500)}
                      exiting={FadeOut.duration(500)}
                      className="absolute right-0 top-[50] p-2 bg-app-default min-h-[10%] min-w-[10%] mr-1 rounded-lg z-10 ">
                      <View className="">
                        <TouchableOpacity>
                          <Text className="text-black font-sans text-lg font-bold text-center">
                            Delete
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </Animated.View>
                  )}

                  <Image
                    source={require('../../../../assets/images/couple_bg.jpg')}
                    resizeMode="cover"
                    alt="Anita photo"
                    style={{width: 250, height: 200, borderRadius: 10}}
                  />
                </View>
                <View>
                  <Image
                    source={require('../../../../assets/images/couple_bg.jpg')}
                    resizeMode="cover"
                    style={{width: 250, height: 200, borderRadius: 10}}
                  />
                </View>

                <TouchableOpacity
                  onPress={() => onUpload('USER_PHOTO')}
                  className=" min-w-[20] px-5 h-[40] justify-center rounded-[25]">
                  <Text className="text-base text-blue-400 font-sans">
                    Add photo
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
      <AppUploader
        handleSetFile={handleSetFile}
        actionSheetRef={actionSheetRef}
        handleFileObject={handleFileObject}
        imageType={imageType}
      />
    </AppContainer>
  );
};
