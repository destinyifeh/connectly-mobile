import {CURRENT_USER} from '@/constants/config';
import {UserDetailsProps} from '@/constants/types';
import {router} from 'expo-router';
import {create} from 'zustand';
import {deleteDeviceData, saveDeviceData} from './device-store';

type State = {
  users: string[];
  currentUser: UserDetailsProps;
  currentUser2: object;
  currentUserLocation: object;
};
type Actions = {
  getUsers: (data: string[]) => void;
  updateUser: (data: UserDetailsProps) => void;
  setUser: (data: UserDetailsProps) => void;
  logoutUser: () => void;
  setUserLocation: (data: object) => void;
};

const initialState: State = {
  users: [],
  currentUser: {
    username: '',
    email: '',
    dob: '',
    hobbies: [],
    profilePhoto: '',
    otherPhotos: [],
    phone: '',
    gender: '',
    password: '',
    _id: '',
    location: '',
    age: '',
    city: '',
    state: '',
    country: '',
  },

  currentUser2: {},
  currentUserLocation: {},
};
export const useUserStore = create<State & Actions>((set, get) => ({
  ...initialState,
  getUsers: (data: string[]) => {
    const currentState = get();
    console.log(data, 'stateee');
    set({users: data});
  },
  updateUser: (user: UserDetailsProps) => {
    console.log(user, 'user upcated');
    set({currentUser: user});
    saveDeviceData(CURRENT_USER, user);
  },
  setUser: (user: UserDetailsProps) => {
    console.log(user, 'user state');
    set({currentUser: user ?? initialState.currentUser});
    saveDeviceData(CURRENT_USER, user);
  },
  setUserLocation: (location: object) => {
    console.log(location, 'user location');
    set({currentUserLocation: location});
  },
  logoutUser: () => {
    set(initialState);
    deleteDeviceData(CURRENT_USER);
    router.replace('/');
  },
}));
