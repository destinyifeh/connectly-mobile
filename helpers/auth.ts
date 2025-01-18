import {useUserStore} from '@/stores/user-store';

export const userAuth = () => {
  const currentUser = useUserStore.getState().currentUser;

  return currentUser.email;
};
