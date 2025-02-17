import {Stack} from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="account" />

      <Stack.Screen name="notification" />
      <Stack.Screen name="basic-info" />
      <Stack.Screen name="change-email" />
      <Stack.Screen name="change-password" />
    </Stack>
  );
}
