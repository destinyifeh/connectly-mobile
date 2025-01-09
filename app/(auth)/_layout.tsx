import {Stack} from 'expo-router';
import '../../global.css';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="index" /> */}
      <Stack.Screen name="login" options={{headerShown: false}} />
      {/* <Stack.Screen name="signup" options={{headerShown: false}} /> */}
    </Stack>
  );
}
