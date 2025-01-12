import {AppBottomSheet} from '@/components/BottomSheet';
import {useGlobalStore} from '@/stores/global-store';
import * as ImagePicker from 'expo-image-picker';
import {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ActionSheetRef} from 'react-native-actions-sheet';

interface FileObject {
  uri?: string;
  width?: number;
  height?: number;
  mimeType?: string;
  fileSize?: number;
  size?: number;
  type?: 'image' | 'video' | 'livePhoto' | 'pairedVideo';
  fileName?: string;
  name?: string;
}

interface AppUploaderProps {
  handleSetFile?: (file: string) => void;
  actionSheetRef: React.RefObject<ActionSheetRef>;
  handleFileObject?: (file: FileObject) => void;
  imageType?: string;
}

export const AppUploader: FC<AppUploaderProps> = ({
  handleSetFile,
  actionSheetRef,
  handleFileObject,
  ...rest
}) => {
  const {themeColor} = useGlobalStore(state => state);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      //mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false,
    });

    console.log(result);

    if (!result.canceled) {
      const {uri, width, height, fileName, mimeType, type, fileSize} =
        result.assets[0];
      console.log(result, 'resultt');
      if (handleSetFile) {
        handleSetFile(uri);
      }
    }
  };

  const takePhoto = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      //mediaTypes: ['images', 'videos'],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false,
    });

    console.log(result);

    if (!result.canceled) {
      const {uri, width, height, fileName, mimeType, type, fileSize} =
        result.assets[0];
      const theFileName =
        rest.imageType === 'PROFILE_PHOTO' ? 'PROFILE_PHOTO' : rest.imageType;
      const uploadedFile = {
        uri: uri,
        width: width,
        height: height,
        mimeType: mimeType,
        fileSize: fileSize,
        size: fileSize,
        type: type,
        fileName: theFileName,
        name: theFileName,
      };
      console.log(uploadedFile, 'oopppp');
      console.log(result, 'resultt');
      // setImage(result.assets[0].uri);
      if (handleSetFile) {
        handleSetFile(uri);
      }
      if (handleFileObject) {
        handleFileObject(uploadedFile);
      }
    }
  };

  const onUpload = () => {
    actionSheetRef.current?.show();
  };

  const onClose = () => {
    actionSheetRef.current?.hide();
  };

  return (
    <AppBottomSheet
      ref={actionSheetRef}
      closeOnDragDown
      containerStyle={{height: 160, backgroundColor: themeColor.background}}>
      <View className="w-[90%] self-center my-5">
        <TouchableOpacity
          className="border-gray-300 border h-[40.7] rounded-3xl items-center justify-center px-3 w-full"
          onPress={takePhoto}>
          <Text
            className="font-sans font-bold text-base"
            style={{color: themeColor.text}}>
            Take photo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="border-gray-300 border h-[40.7] rounded-3xl items-center justify-center px-3 w-full mt-5"
          onPress={pickImage}>
          <Text
            className="font-sans font-bold text-base"
            style={{color: themeColor.text}}>
            Add from library
          </Text>
        </TouchableOpacity>
      </View>
    </AppBottomSheet>
  );
};
