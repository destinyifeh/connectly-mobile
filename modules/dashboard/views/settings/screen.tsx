import {AppContainer} from '@/components/AppContainer';
import {Octicons} from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import {ScrollView, Text, TouchableOpacity} from 'react-native';

export const SettingsScreen = () => {
  const router = useRouter();

  return (
    <AppContainer showBackButton showScreenTitle title="Settings">
      <ScrollView
        className="w-full"
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => router.push('/dashboard/(settings)/account')}
          className="bg-app-light border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text className="text-black font-sans text-base">Account</Text>
          <Octicons name="chevron-right" size={16} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/dashboard/(settings)/notification')}
          className="bg-app-light border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text className="text-black font-sans text-base">Notification</Text>
          <Octicons name="chevron-right" size={16} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/feedback')}
          className="bg-app-light border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text className="text-black font-sans text-base">Support</Text>
          <Octicons name="chevron-right" size={16} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/privacy-policy')}
          className="bg-app-light border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text className="text-black font-sans text-base">Privacy Policy</Text>
          <Octicons name="chevron-right" size={16} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/faq')}
          className="bg-app-light border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text className="text-black font-sans text-base">FAQ</Text>
          <Octicons name="chevron-right" size={16} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/terms-of-service')}
          className="bg-app-light border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
          <Text className="text-black font-sans text-base">
            Terms of Service
          </Text>
          <Octicons name="chevron-right" size={16} color="gray" />
        </TouchableOpacity>
      </ScrollView>
    </AppContainer>
  );
};
