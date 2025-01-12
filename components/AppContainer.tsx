import {THEME_ISDARK} from '@/constants/Colors';
import {appContainerStyle, COLOUR_Dark_WHITE} from '@/constants/Styles';
import {useGlobalStore} from '@/stores/global-store';
import {Ionicons} from '@expo/vector-icons';
import {useRouter} from 'expo-router';

import React, {FC} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
type AppContainerProps = {
  children: React.ReactNode;
  barColor?: StatusBarStyle;
  barBackground?: string;
  barTranslucent?: boolean;
  showBackButton?: boolean;
  allowContentContainer?: boolean;
  appBackgroundColor?: string;
  showScreenTitle?: boolean;
  title?: string;
};

export const AppContainer: FC<AppContainerProps> = ({
  children,
  barColor = 'dark-content',
  showBackButton = false,
  allowContentContainer = true,
  barBackground,
  barTranslucent,
  appBackgroundColor,
  showScreenTitle,
  title,
}) => {
  const router = useRouter();
  const {themeColor} = useGlobalStore(state => state);

  console.log(themeColor, 'themooo');
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: appBackgroundColor ?? themeColor.background,
      }}>
      <StatusBar
        barStyle={
          themeColor.type == THEME_ISDARK ? themeColor.barColor : barColor
        }
        translucent={barTranslucent}
        backgroundColor={barBackground}
      />
      {allowContentContainer ? (
        <View style={appContainerStyle.appContent}>
          <View className="flex-row gap-8">
            {showBackButton && (
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.button}>
                <Ionicons name="chevron-back-sharp" size={18} color="black" />
              </TouchableOpacity>
            )}
            {showScreenTitle && (
              <Text
                className="screen-title text-xl"
                style={{color: themeColor.text}}>
                {title}
              </Text>
            )}
          </View>
          {children}
        </View>
      ) : (
        <>{children}</>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    width: 27,
    height: 27,
    backgroundColor: COLOUR_Dark_WHITE,
    borderWidth: 0.5,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLOUR_Dark_WHITE,
    marginBottom: 15,
  },
});
