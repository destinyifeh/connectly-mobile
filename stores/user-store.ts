import {CURRENT_USER} from '@/constants/config';
import {CurrentUserLocationProps, CurrentUserProps} from '@/constants/types';
import {router} from 'expo-router';
import {create} from 'zustand';
import {deleteDeviceData, saveDeviceData} from './device-store';

type State = {
  users: string[];
  currentUser: CurrentUserProps;
  currentUserLocation: CurrentUserLocationProps;
  application: any;
};
type Actions = {
  getUsers: (data: string[]) => void;
  updateUser: (data: CurrentUserProps) => void;
  logoutUser: () => void;
  setCurrentUserLocation: (data: CurrentUserLocationProps) => void;
  setApplication: (data: any) => void;
  resetApplication: () => void;
  setCurrentUser: (data: CurrentUserProps) => void;
};

const initialState: State = {
  users: [],
  currentUser: {},
  currentUserLocation: {
    city: undefined,
    state: undefined,
    country: undefined,
  },
  application: {},
};
export const useUserStore = create<State & Actions>((set, get) => ({
  ...initialState,
  getUsers: (data: string[]) => {
    const currentState = get();
    console.log(data, 'stateee');
    set({users: data});
  },
  updateUser: (user: CurrentUserProps) => {
    console.log(user, 'user upcated');
    set({currentUser: user});
    saveDeviceData(CURRENT_USER, user);
  },

  setCurrentUserLocation: (location: CurrentUserLocationProps) => {
    console.log(location, 'user location');
    set({currentUserLocation: location});
  },
  logoutUser: () => {
    set(initialState);
    deleteDeviceData(CURRENT_USER);
    router.replace('/');
  },
  setApplication: (application: any) => {
    console.log(application, 'draft application');
    set({application: application});
  },
  resetApplication: () => {
    set({application: {}});
  },
  setCurrentUser: (user: CurrentUserProps) => {
    console.log(user, 'currentUser state');
    set({currentUser: user});
    saveDeviceData(CURRENT_USER, user);
  },
}));
