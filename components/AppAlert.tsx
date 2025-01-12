import {useGlobalStore} from '@/stores/global-store';
import React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';

type AppModalProps = {
  onPressButtonOne?: () => void;
  onPressButtonTwo?: () => void;
  onPressButtonThree?: () => void;
  onRequestClose?: () => void;
  buttonTextOne?: string;
  buttonTextTwo?: string;
  buttonTextThree?: string;
  buttonTextOneColor?: string;
  buttonTextTwoColor?: string;
  buttonTextThreeColor?: string;
  message?: string;
  isLoading?: boolean;
  isModalVisible: boolean;
  title?: string;
};

export const AppAlert = ({
  onPressButtonOne,
  onPressButtonTwo,
  onPressButtonThree,
  buttonTextOne,
  buttonTextTwo,
  buttonTextThree,
  message,
  title,
  isModalVisible,
  onRequestClose,
  ...rest
}: AppModalProps) => {
  const [isPressedOne, setIsPressedOne] = React.useState(false);
  const [isPressedTwo, setIsPressedTwo] = React.useState(false);
  const [isPressedThree, setIsPressedThree] = React.useState(false);
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
            width: 300,
            backgroundColor: themeColor.background,
            borderRadius: 12,
          }}>
          <View style={{padding: 20}}>
            {title && (
              <Text
                accessibilityLabel={title}
                accessible={true}
                accessibilityRole="text"
                accessibilityHint="Alert Title"
                style={{
                  textAlign: 'center',
                  fontWeight: '500',
                  color: themeColor.text,
                  fontSize: 17,
                }}>
                {title}
              </Text>
            )}
            {Boolean(message) && (
              <Text
                accessibilityLabel={message}
                accessible={true}
                accessibilityRole="text"
                accessibilityHint="Alert Message"
                style={{
                  textAlign: 'center',
                  color: themeColor.text,
                }}>
                {message}
              </Text>
            )}
          </View>
          <View>
            {buttonTextOne && (
              <TouchableOpacity
                disabled={rest.isLoading}
                accessibilityRole="button"
                accessible={true}
                accessibilityHint="Tap to proceed"
                onPress={onPressButtonOne}
                onPressIn={() => setIsPressedOne(true)}
                onPressOut={() => setIsPressedOne(false)}
                style={{
                  borderTopWidth: 0.5,
                  borderTopColor: 'grey',
                  paddingVertical: 12,
                  backgroundColor: isPressedOne ? 'grey' : undefined,
                }}>
                <Text
                  accessibilityLabel={buttonTextOne}
                  accessible={true}
                  accessibilityRole="text"
                  style={{
                    color: rest.buttonTextOneColor ?? '#0A84FF',
                    textAlign: 'center',
                    fontSize: 17,
                  }}>
                  {buttonTextOne}
                </Text>
              </TouchableOpacity>
            )}
            {buttonTextTwo && (
              <TouchableOpacity
                disabled={rest.isLoading}
                accessibilityRole="button"
                accessible={true}
                accessibilityHint="Tap to proceed"
                onPress={onPressButtonTwo}
                style={{
                  borderTopWidth: 0.5,
                  borderTopColor: 'grey',
                  paddingVertical: 12,
                  backgroundColor: isPressedTwo ? 'grey' : undefined,
                }}
                onPressIn={() => setIsPressedTwo(true)}
                onPressOut={() => setIsPressedTwo(false)}>
                <Text
                  accessibilityLabel={buttonTextTwo}
                  accessible={true}
                  accessibilityRole="text"
                  style={{
                    color: rest.buttonTextTwoColor ?? '#0A84FF',
                    textAlign: 'center',
                    fontSize: 17,
                  }}>
                  {buttonTextTwo}
                </Text>
              </TouchableOpacity>
            )}
            {buttonTextThree && (
              <TouchableOpacity
                disabled={rest.isLoading}
                accessibilityRole="button"
                accessible={true}
                accessibilityHint="Tap to proceed"
                onPress={onPressButtonThree}
                style={{
                  borderTopWidth: 0.5,
                  borderTopColor: 'grey',
                  paddingVertical: 12,
                  backgroundColor: isPressedThree ? 'grey' : undefined,
                }}
                onPressIn={() => setIsPressedThree(true)}
                onPressOut={() => setIsPressedThree(false)}>
                <Text
                  accessibilityLabel={buttonTextThree}
                  accessible={true}
                  accessibilityRole="text"
                  style={{
                    color: rest.buttonTextThreeColor ?? '#0A84FF',
                    textAlign: 'center',
                    fontSize: 17,
                  }}>
                  {buttonTextThree}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};
