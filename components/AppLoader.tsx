import {APP_DEFAULT_COLOUR} from '@/constants/Styles';
import {useGlobalStore} from '@/stores/global-store';
import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import LoaderKit from 'react-native-loader-kit';

type IndicatorProps = {
  color?: string;
  size?: number;
  name?: string;
};

export const AppActivityIndicator = ({color, size}: IndicatorProps) => {
  return (
    <ActivityIndicator
      size={size ?? 'large'}
      color={color ?? APP_DEFAULT_COLOUR}
    />
  );
};

export const AppLoader = ({color, name, size}: IndicatorProps) => {
  return (
    <LoaderKit
      style={{width: 50, height: 50}}
      name={name ?? 'BallSpinFadeLoader'} // Optional: see list of animations below
      color={color ?? APP_DEFAULT_COLOUR} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
    />
  );
};

export const AppValidatorLoader = ({
  isModalVisible,
  onRequestClose,
}: {
  isModalVisible: boolean;
  onRequestClose: () => void;
}) => {
  const {themeColor, setThemeColor} = useGlobalStore(state => state);
  return (
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
            width: 150,
            backgroundColor: themeColor.background,
            borderRadius: 12,
          }}>
          <View style={styles.loaderContainer}>
            {/* <Loader size={20} color="black" /> */}
            <Text>Please wait...</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    width: 150,
    height: 75,
    backgroundColor: useGlobalStore.getState().themeColor.background,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
