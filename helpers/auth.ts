import {CURRENT_USER} from '@/constants/config';
import {getDeviceData} from '@/stores/device-store';
import {useUserStore} from '@/stores/user-store';

export const initializeUser = async () => {
  const user = await getDeviceData(CURRENT_USER);
  console.log(user, 'baba user');
  const {setUser} = useUserStore.getState();
  setUser(user);
};
