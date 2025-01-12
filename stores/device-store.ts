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
