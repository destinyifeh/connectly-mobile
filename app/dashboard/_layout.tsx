import {Stack} from 'expo-router';

export default function DashboardLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      <Stack.Screen
        name="user-details"
        options={{
          presentation: 'modal',
          headerShown: false,
          gestureDirection: 'vertical',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen name="(settings)" options={{headerShown: false}} />
      <Stack.Screen
        name="user-notification"
        options={{
          presentation: 'modal',
          headerShown: false,
          gestureDirection: 'vertical',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack>
  );
}
