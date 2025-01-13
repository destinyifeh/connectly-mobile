import {AppLightTheme, THEME_ISLIGHT} from '@/constants/Colors';
import {ThemeColorProps} from '@/constants/types';
import {create} from 'zustand';

type State = {
  theme: string;
  themeColor: ThemeColorProps;
};

type Actions = {
  setTheme: (theme: string) => void;
  setThemeColor: (color: ThemeColorProps) => void;
  reset: () => void;
};

const initiaState: State = {
  theme: THEME_ISLIGHT,
  themeColor: AppLightTheme,
};

export const globalStore = create<State & Actions>((set, get) => ({
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
}));
