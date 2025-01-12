import {AppContainer} from '@/components/AppContainer';
import {AppButton} from '@/components/Button';
import {FontAwesome6} from '@expo/vector-icons';

import {useGlobalStore} from '@/stores/global-store';
import {useRouter} from 'expo-router';
import {useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActionSheetRef} from 'react-native-actions-sheet';
import {PhotoUploader} from './uploader';
export const UploadProfilePhotoScreen = () => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const router = useRouter();
  const {themeColor} = useGlobalStore(state => state);
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
    router.push('/login');
  };

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
          <TouchableOpacity className="self-center mt-5">
            <Text
              className="text-app-default font-bold font-sans text-base"
              onPress={onUpload}>
              {selectedImage ? 'Change Photo' : 'Upload Photo'}
            </Text>
          </TouchableOpacity>

          <AppButton
            title="Continue"
            // title={isLoading ? 'Please wait...' : 'Continue'}
            onPress={handleSubmit}
            disabled={!selectedImage}
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
