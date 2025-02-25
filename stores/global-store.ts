import {AppLightTheme, THEME_ISLIGHT} from '@/constants/Colors';
import {ThemeColorProps} from '@/constants/types';
import {create} from 'zustand';

type State = {
  theme: string;
  themeColor: ThemeColorProps;
  isAppMounted: boolean;
  notificationToken: string;
  isChatting: boolean;
};

type Actions = {
  setTheme: (theme: string) => void;
  setThemeColor: (color: ThemeColorProps) => void;
  reset: () => void;
  setIsAppMounted: (isAppMounted: boolean) => void;
  setNotificationToken: (token: string) => void;
  setIsChatting: (ischatting: boolean) => void;
};

const initiaState: State = {
  theme: THEME_ISLIGHT,
  themeColor: AppLightTheme,
  isAppMounted: false,
  notificationToken: '',
  isChatting: false,
};

export const useGlobalStore = create<State & Actions>((set, get) => ({
  ...initiaState,

  reset: () => {
    set(initiaState);
  },

  setTheme: (theme: string) => {
    console.log('themeColorStateDez:', theme);
    set({theme: theme});
  },

  setThemeColor: (color: ThemeColorProps) => {
    console.log('themeColorStateDez:', color);
    set({themeColor: color});
  },

  setIsAppMounted: (mounted: boolean) => {
    console.log(mounted, 'app mounted');
    set({isAppMounted: mounted});
  },
  setNotificationToken(token) {
    console.log(token, 'device token');
    set({notificationToken: token});
  },
  setIsChatting(isChatting) {
    console.log(isChatting, 'i am chatting...');
    set({isChatting: isChatting});
  },
}));
