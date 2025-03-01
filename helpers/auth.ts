import {
  ACCESS_TOKEN_KEY,
  API_BASE_URL,
  CURRENT_USER,
  REFRESH_TOKEN_KEY,
} from '@/constants/config';
import {
  clearUserDeviceData,
  getDeviceData,
  saveDeviceData,
} from '@/stores/device-store';
import {useUserStore} from '@/stores/user-store';
import axios from 'axios';
import {router} from 'expo-router';
import {jwtDecode} from 'jwt-decode';
import {Toast} from 'toastify-react-native';

export const initializeUser = async () => {
  const user = await getDeviceData(CURRENT_USER);
  console.log(user, 'baba user');
  const {setCurrentUser} = useUserStore.getState();
  setCurrentUser(user);
};

export const isAuthTokenExpired = (token: string) => {
  if (typeof token !== 'string' || !token) {
    return true;
  }
  try {
    const decodedToken = jwtDecode(token);
    if (typeof decodedToken.exp !== 'number') {
      return true;
    }
    console.log(decodedToken, 'decodedtoken');
    return Date.now() >= decodedToken.exp * 1000;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

export const refreshAuthAccessToken = async () => {
  console.log('calling refreshToken...');
  const refreshToken = await getDeviceData(REFRESH_TOKEN_KEY);
  console.log(refreshToken, 'refreshTokemm');
  if (!refreshToken || isAuthTokenExpired(refreshToken)) {
    // Refresh token is expired; log out the user
    console.log('Stopped here...');
    await clearUserDeviceData();
    Toast.error('Session expired. Please log in again.', 'bottom');
    router.replace('/login');
    // Navigate to login screen
    // Example using React Navigation:
    // navigation.replace('Login');
    return null;
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/user/refresh-token`,
      {
        refreshToken,
      },
    );
    console.log(response, 'refresh token res');
    const {accessToken, refreshToken: newRefreshToken} = response.data;
    await saveDeviceData(ACCESS_TOKEN_KEY, accessToken);
    if (newRefreshToken) {
      await saveDeviceData(REFRESH_TOKEN_KEY, newRefreshToken);
    }
    return accessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    // Handle token refresh failure
    await clearUserDeviceData();
    Toast.error('Session expired. Please log in again.', 'bottom');
    router.replace('/login');
    // Navigate to login screen
    // Example using React Navigation:
    // navigation.replace('Login');
    return null;
  }
};
