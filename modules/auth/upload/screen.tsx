import {AppContainer} from '@/components/AppContainer';
import {AppButton} from '@/components/Button';
import {FontAwesome6} from '@expo/vector-icons';

import {apiHookRequester} from '@/services/api/hooks';
import {globalStore} from '@/stores/global-store';
import {useUserStore} from '@/stores/user-store';
import {useRouter} from 'expo-router';
import {useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActionSheetRef} from 'react-native-actions-sheet';
import {PhotoUploader} from './uploader';
export const UploadProfilePhotoScreen = () => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const {themeColor} = globalStore(state => state);
  const {application, resetApplication} = useUserStore(state => state);
  const {mutate, isSuccess, isError, error, isPending, data} =
    apiHookRequester.usePostData('/api/v1/user/signup');
  const onUpload = () => {
    actionSheetRef.current?.show();
  };

  const onClose = () => {
    actionSheetRef.current?.hide();
  };

  const handleSetFile = (file: string) => {
    console.log(selectedImage, 'selctorr');
    console.log(file, 'fileoo');
    setSelectedImage(file);
    onClose();
  };

  const handleSubmit = () => {
    console.log(application, 'appli server');
    setIsLoading(true);
    setEmail(application.email);
    mutate(application, {
      onSuccess(data: any, variables, context) {
        console.log(data, 'data isSuccess');
        const {message} = data.data;
        resetApplication();
        ToastAndroid.show(message, ToastAndroid.LONG);
        router.replace({
          pathname: '/verify-email',
          params: {email: application.email},
        });
      },
      onError(error: any, variables, context) {
        console.log(error, 'error submitting...');
        const {message} = error.data;

        ToastAndroid.show(
          message || 'Oops! Something went wrong, please try again',
          ToastAndroid.LONG,
        );
      },
      onSettled(data, error, variables, context) {
        setIsLoading(false);
        console.log(data, 'final data');
      },
    });
  };
  console.log(isSuccess, 'isccc');
  return (
    <AppContainer showBackButton barColor="dark-content">
      <ScrollView
        contentContainerStyle={{paddingBottom: 10, flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View className="mb-3">
          <Text className="screen-title" style={{color: themeColor.text}}>
            {' '}
            Upload Profile Photo
          </Text>
          <Text className="screen-desc">
            Upload a profile photo to make your account stand out and showcase
            your identity.
          </Text>
        </View>

        <View className="self-center">
          {!selectedImage && (
            <View className="bg-app-ghost p-2 rounded-[40] w-[80] h-[80] justify-center items-center">
              <FontAwesome6 name="user-large" size={50} color="gray" />
            </View>
          )}
          {Boolean(selectedImage) && (
            <View className="bg-app-ghost p-2 rounded-[40] w-[80] h-[80] justify-center items-center">
              <Image
                source={{uri: selectedImage}}
                style={{width: 80, height: 80, borderRadius: 40}}
              />
            </View>
          )}
        </View>

        <View className="absolute bottom-10 w-full">
          <TouchableOpacity className="self-center mt-5" disabled={isPending}>
            <Text
              className={`${
                isLoading ? 'text-app-ghost' : 'text-app-default '
              } "font-bold font-sans text-base"`}
              onPress={onUpload}>
              {selectedImage ? 'Change Photo' : 'Upload Photo'}
            </Text>
          </TouchableOpacity>

          <AppButton
            title={isLoading ? 'Please wait...' : 'Continue'}
            onPress={handleSubmit}
            disabled={!selectedImage || isLoading}
          />
        </View>
      </ScrollView>

      <PhotoUploader
        handleSetFile={handleSetFile}
        //onClose={onClose}
        actionSheetRef={actionSheetRef}
      />
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'grey',
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});
