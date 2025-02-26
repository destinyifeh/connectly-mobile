import {APP_DEFAULT_COLOUR} from '@/constants/Styles';
import {useGlobalStore} from '@/stores/global-store';
import {FontAwesome} from '@expo/vector-icons';
import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';

export const AppPhotoViewer = ({
  isModalVisible,
  onRequestClose,
  user,
}: {
  isModalVisible: boolean;
  onRequestClose: () => void;
  user: any;
}) => {
  const {themeColor} = useGlobalStore(state => state);
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
      }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        statusBarTranslucent
        onRequestClose={onRequestClose}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            accessibilityRole="alert"
            accessible={true}
            style={{
              width: 300,
              backgroundColor: themeColor.background,
              borderRadius: 15,
            }}>
            <View style={styles.loaderContainer}>
              <TouchableOpacity
                style={{}}
                onPress={onRequestClose}
                className="absolute top-1 z-10 left-[90%]">
                <FontAwesome
                  name="close"
                  size={23}
                  color={APP_DEFAULT_COLOUR}
                />
              </TouchableOpacity>
              <Image
                source={{uri: user.profilePhoto.url}}
                resizeMode="cover"
                style={{width: 300, height: 300, borderRadius: 15}}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    width: 300,
    height: 300,
    backgroundColor: useGlobalStore.getState().themeColor.background,
    borderRadius: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
