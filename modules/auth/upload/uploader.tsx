import {AppBottomSheet} from '@/components/BottomSheet';
import {useUserStore} from '@/stores/user-store';
import * as ImagePicker from 'expo-image-picker';
import {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ActionSheetRef} from 'react-native-actions-sheet';
interface PhotoUploaderProps {
  handleSetFile?: (file: string) => void;
  actionSheetRef: React.RefObject<ActionSheetRef>;
}

export const PhotoUploader: FC<PhotoUploaderProps> = ({
  handleSetFile,
  actionSheetRef,
}) => {
  const {setApplication, application, currentUser, currentUserLocation} =
    useUserStore(state => state);
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
      const uploadedFileObject = {
        uri: uri,
        width: width,
        height: height,
        mimeType: mimeType,
        fileSize: fileSize,
        size: fileSize,
        type: mimeType,
        fileName: fileName,
        name: fileName,
      };
      const saveToDraft = {
        ...application,
        file: uploadedFileObject,
        ...currentUserLocation,
      };
      console.log(saveToDraft, 'oopppp lib');
      console.log(result, 'resultt');
      console.log(uploadedFileObject, 'resultt');
      if (handleSetFile) {
        setApplication(saveToDraft);
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

      const uploadedFileObject = {
        uri: uri,
        width: width,
        height: height,
        mimeType: mimeType,
        fileSize: fileSize,
        size: fileSize,
        type: mimeType,
        fileName: fileName,
        name: fileName,
      };
      const saveToDraft = {
        ...application,
        file: uploadedFileObject,
        ...currentUserLocation,
      };
      console.log(saveToDraft, 'oopppp');
      console.log(result, 'resultt');
      // setImage(result.assets[0].uri);
      if (handleSetFile) {
        setApplication(saveToDraft);
        handleSetFile(uri);
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
      containerStyle={{height: 160, backgroundColor: 'white'}}>
      <View className="w-[90%] self-center my-5">
        <TouchableOpacity
          className="border-gray-300 border h-[40.7] rounded-3xl items-center justify-center px-3 w-full"
          onPress={takePhoto}>
          <Text className="font-sans font-bold text-base">Take photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="border-gray-300 border h-[40.7] rounded-3xl items-center justify-center px-3 w-full mt-5"
          onPress={pickImage}>
          <Text className="font-sans font-bold text-base">
            Add from library
          </Text>
        </TouchableOpacity>
      </View>
    </AppBottomSheet>
  );
};
