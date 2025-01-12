import {create} from 'zustand';

type State = {
  user: string | object;
  getUser: (data: string | object) => void;
};
export const useUserStore = create<State>((set, get) => ({
  user: '',
  getUser: (data: string | object) => {
    const currentState = get();
    console.log(data, 'stateee');
    set({user: data});
    // Additional logic here
  },
}));
