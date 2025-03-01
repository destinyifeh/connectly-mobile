import {
  ACCESS_TOKEN_KEY,
  CURRENT_USER,
  REFRESH_TOKEN_KEY,
} from '@/constants/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveDeviceData = async (key: string, value: any) => {
  console.log(value, 'device val');
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e, 'store device data err');
  }
};

export const getDeviceData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const deleteDeviceData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.log(err);
  }
};

export const deleteMultiDeviceData = async (keys: string[]) => {
  console.log(keys, 'my delete-keys');
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (err) {
    console.log(err);
  }
};

export const setMultiDeviceData = async (keyValuePairs: [string, string][]) => {
  console.log(keyValuePairs, 'keyvalp');
  try {
    await AsyncStorage.multiSet(keyValuePairs);
  } catch (err) {
    console.log(err);
  }
};

export const clearTokens = async () => {
  try {
    await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
  } catch (error) {
    console.error('Error clearing tokens:', error);
  }
};

export const clearUserDeviceData = async () => {
  try {
    await AsyncStorage.multiRemove([
      ACCESS_TOKEN_KEY,
      REFRESH_TOKEN_KEY,
      CURRENT_USER,
    ]);
  } catch (error) {
    console.error('Error clearing tokens:', error);
  }
};
