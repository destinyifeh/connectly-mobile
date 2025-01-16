import {UserDetailsProps} from '@/constants/types';
import {create} from 'zustand';

type State = {
  users: UserDetailsProps[];
  currentUser: UserDetailsProps;
};
type Actions = {
  getUsers: (data: UserDetailsProps[]) => void;
  updateUser: (data: UserDetailsProps) => void;
  getUser: (data: UserDetailsProps) => void;
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
};
export const useUserStore = create<State & Actions>((set, get) => ({
  ...initialState,
  getUsers: (data: UserDetailsProps[]) => {
    const currentState = get();
    console.log(data, 'stateee');
    set({users: data});
  },
  updateUser: (user: UserDetailsProps) => {
    set({currentUser: user});
  },
  getUser: (user: UserDetailsProps) => {
    console.log(user, 'user state');
    set({currentUser: user});
  },
}));
