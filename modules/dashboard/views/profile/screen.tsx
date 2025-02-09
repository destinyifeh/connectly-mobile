import {AppContainer} from '@/components/AppContainer';
import {AppUploader} from '@/constants/AppUploader';
import {currentDeviceWidth} from '@/constants/Styles';
import {FileProps} from '@/constants/types';
import {getUserCurrentAge} from '@/helpers/formatters';
import {apiHookRequester} from '@/services/api/hooks';
import {globalStore} from '@/stores/global-store';
import {useUserStore} from '@/stores/user-store';
import {Entypo, Ionicons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import {useFocusEffect, useRouter} from 'expo-router';
import {useCallback, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActionSheetRef} from 'react-native-actions-sheet';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

export const ProfileScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState('');
  const [isMainPhotoModalVisible, setIsMainPhotoModalVisible] = useState(false);
  const [fileObject, setFileObject] = useState<object>({});
  const [selectedImage, setSelectedImage] = useState<string>('');
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [imageType, setImageType] = useState<string>('');
  const {themeColor} = globalStore(state => state);
  const {currentUser, currentUserLocation, setCurrentUser} = useUserStore(
    state => state,
  );
  const otherPhotoUploadRequester = apiHookRequester.useUpdateData(
    `/api/v1/user/photo-upload/${currentUser._id}`,
  );
  const profilePhotoUploadRequester = apiHookRequester.useUpdateData(
    `/api/v1/user/profile-photo-upload/${currentUser._id}`,
  );

  const deletePhotoRequester = apiHookRequester.useDeleteData(
    `/api/v1/user/photo-delete/${currentUser._id}`,
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsMainPhotoModalVisible(false);
        setIsModalVisible('');
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
    setIsLoading(false);
  };

  const handleSetFile = (file: string) => {
    console.log(selectedImage, 'selctorr');
    console.log(file, 'file');
    setSelectedImage(file);
    // onClose();
  };

  const handleFileObject = (file: FileProps) => {
    console.log(file, 'fileoo');
    setFileObject(file);
    setIsLoading(true);
    if (file.name === 'PROFILE_PHOTO') {
      console.log('promo');
      const fileObject = {
        ...file,
        name: file.fileName,
        fieldName: 'profilePhoto',
      };
      const payload = {
        file: fileObject,
      };
      profilePhotoUploadRequester.mutate(payload, {
        onSuccess(data, variables, context) {
          console.log(data, 'data');
          const {message, user} = data.data;
          setCurrentUser(user);
          ToastAndroid.show(message, ToastAndroid.LONG);
        },
        onError(error: any, variables, context) {
          console.log(error, 'err');
          const {message} = error.data || {};
          ToastAndroid.show(
            message || 'Oops! Something went wrong, please try again later',
            ToastAndroid.LONG,
          );
          onClose();
        },
        onSettled(data, error, variables, context) {
          console.log(data, 'settled');
          onClose();
        },
      });
    }

    if (file.name === 'OTHER_PHOTO') {
      console.log('other');
      const fileObject = {
        ...file,
        name: file.fileName,
        fieldName: 'otherPhotos',
      };
      const payload = {
        file: fileObject,
      };
      otherPhotoUploadRequester.mutate(payload, {
        onSuccess(data, variables, context) {
          console.log(data, 'data');
          const {message, user} = data.data;
          setCurrentUser(user);
          ToastAndroid.show(message, ToastAndroid.LONG);
        },
        onError(error: any, variables, context) {
          console.log(error, 'err');
          const {message} = error.data || {};
          ToastAndroid.show(
            message || 'Oops! Something went wrong, please try again later',
            ToastAndroid.LONG,
          );
          onClose();
        },
        onSettled(data, error, variables, context) {
          console.log(data, 'settled');
          onClose();
        },
      });
    }
  };
  const handleSubmit = () => {
    router.push('/login');
  };

  const handleModal = (selectedPhotoId: string) => {
    console.log(selectedPhotoId, 'sell');
    if (isModalVisible === selectedPhotoId) {
      setIsModalVisible('');
    } else {
      setIsModalVisible(selectedPhotoId);
    }
  };

  const handleMainPhotoModal = () => {
    setIsMainPhotoModalVisible(!isMainPhotoModalVisible);
  };

  const handleDeletePhoto = (selectedPhoto: string) => {
    const payload = {
      item: selectedPhoto,
    };
    setIsDeleting(true);
    deletePhotoRequester.mutate(payload, {
      onSuccess(data, variables, context) {
        console.log(data, 'data');
        const {message, user} = data.data;
        setCurrentUser(user);
        ToastAndroid.show(message, ToastAndroid.LONG);
      },
      onError(error: any, variables, context) {
        console.log(error, 'err');
        const {message} = error.data || {};
        ToastAndroid.show(message, ToastAndroid.LONG);
      },
      onSettled(data, error, variables, context) {
        console.log(data, 'settled');
        setIsModalVisible('');
        setIsDeleting(false);
      },
    });
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
            source={{uri: currentUser.profilePhoto.url}}
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
                  {currentUser.username}, {''}
                  {getUserCurrentAge(currentUser.dob)}
                </Text>
                <View className="flex-row items-center">
                  <Ionicons name="location-sharp" size={10} color="#fff" />
                  <Text className="text-white font-sans text-sm">
                    {currentUser.city}, {currentUser.state}
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
              {currentUser.hobbies.map((hobby: string) => (
                <View
                  className="bg-app-default min-w-[20] px-5 h-[40] justify-center rounded-[25]"
                  key={hobby}>
                  <Text className="text-base text-black font-sans capitalize">
                    {hobby}
                  </Text>
                </View>
              ))}
              {/* <View className="bg-app-default min-w-[20] px-5 h-[40] justify-center rounded-[25]">
                <Text className="text-base text-black font-sans">Chatting</Text>
              </View>
              <View className="bg-app-default min-w-[20] px-5 h-[40] justify-center rounded-[25]">
                <Text className="text-base text-black font-sans">Cooking</Text>
              </View>
              <View className="bg-app-default min-w-[20] px-5 h-[40] justify-center rounded-[25]">
                <Text className="text-base text-black font-sans">reading</Text>
              </View> */}
            </View>

            <View className="mt-5">
              <Text
                className="screen-title text-lg"
                style={{color: themeColor.text}}>
                Photos
              </Text>

              <ScrollView
                className="mt-3"
                contentContainerClassName="flex-row gap-3 items-center"
                horizontal
                showsHorizontalScrollIndicator={false}>
                {currentUser.otherPhotos?.map(
                  (photo: {url: string; id: string}) => (
                    <View key={photo.url}>
                      <TouchableOpacity
                        onPress={() => handleModal(photo.id)}
                        className="absolute top-[3] z-10 right-0 bg-app-default p-1 rounded-[5]">
                        <Entypo
                          name="dots-three-vertical"
                          size={16}
                          color="black"
                        />
                      </TouchableOpacity>
                      <Image
                        source={{uri: photo.url}}
                        resizeMode="cover"
                        alt={currentUser.userame + ' ' + 'photo'}
                        style={{width: 250, height: 200, borderRadius: 10}}
                      />

                      {isModalVisible === photo.id && (
                        <Animated.View
                          entering={FadeIn.duration(500)}
                          exiting={FadeOut.duration(500)}
                          className="absolute right-0 top-[50] p-2 bg-app-default min-h-[10%] min-w-[10%] mr-1 rounded-lg z-10 ">
                          <View className="">
                            <TouchableOpacity
                              disabled={isDeleting}
                              onPress={() => handleDeletePhoto(photo.id)}>
                              <Text className="text-black font-sans text-lg font-bold text-center">
                                {isDeleting ? 'Deleting...' : 'Delete'}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </Animated.View>
                      )}
                    </View>
                  ),
                )}

                {/* <Image
                    source={require('../../../../assets/images/couple_bg.jpg')}
                    resizeMode="cover"
                    alt="Anita photo"
                    style={{width: 250, height: 200, borderRadius: 10}}
                  /> */}

                {/* <View>
                  <Image
                    source={require('../../../../assets/images/couple_bg.jpg')}
                    resizeMode="cover"
                    style={{width: 250, height: 200, borderRadius: 10}}
                  />
                </View> */}
                {currentUser.otherPhotos.length < 3 && (
                  <TouchableOpacity
                    onPress={() => onUpload('OTHER_PHOTO')}
                    className=" min-w-[20] px-5 h-[40] justify-center rounded-[25]">
                    <Text className="text-base text-blue-400 font-sans">
                      Add photo
                    </Text>
                  </TouchableOpacity>
                )}
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
        isLoading={isLoading}
        closeOnDragDown={!isLoading}
        closeOnTouchBackdrop={!isLoading}
      />
    </AppContainer>
  );
};
