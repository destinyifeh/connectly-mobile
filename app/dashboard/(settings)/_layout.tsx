import {Stack} from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="account" options={{headerShown: false}} />

      <Stack.Screen name="notification" options={{headerShown: false}} />
      <Stack.Screen name="change-phone" options={{headerShown: false}} />
      <Stack.Screen name="change-email" options={{headerShown: false}} />
      <Stack.Screen name="change-password" options={{headerShown: false}} />
    </Stack>
  );
}
