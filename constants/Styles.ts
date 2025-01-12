import {useGlobalStore} from '@/stores/global-store';
import {Dimensions, Platform, StatusBar, StyleSheet} from 'react-native';
const themeColor = useGlobalStore.getState().themeColor;

export const currentDeviceWidth = Dimensions.get('window').width;
export const MAX_ALLOWED_WIDTH = currentDeviceWidth > 480 ? 441 : 480;

export const COLOUR_Dark_WHITE = '#f3f3f4';
export const APP_DEFAULT_COLOUR = '#d4b300';
export const APP_DEFAULT_MUTED_COLOUR = '#aa8f00';
export const APP_GHOST_COLOUR = '#f3f3f4';
export const COLOUR_LINK = '#0A84FF';

export const appContainerStyle = StyleSheet.create({
  appContent: {
    width:
      currentDeviceWidth > MAX_ALLOWED_WIDTH
        ? MAX_ALLOWED_WIDTH
        : currentDeviceWidth * 0.9,

    alignSelf: 'center',
    padding: 0,
    flex: 1,
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight,
      },
    }),
  },
});
