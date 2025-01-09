import {AppContainer} from '@/components/AppContainer';
import {useRouter} from 'expo-router';
import {Image, Text, TouchableOpacity, View} from 'react-native';

export default function NotificationScreen() {
  const router = useRouter();
  return (
    <AppContainer showBackButton showScreenTitle title="Notifications">
      <View className="w-screen self-center border-b border-gray-200 h-[60] justify-center">
        <View className="w-[90%] self-center">
          <TouchableOpacity
            onPress={() => router.push('/dashboard/user-details')}
            className="flex-row items-center gap-3">
            <Image
              source={require('../../assets/images/couple_bg.jpg')}
              className="h-[45] w-[45] rounded-3xl"
              resizeMode="cover"
            />
            <View className="flex-row items-center gap-1">
              <Text className="text-black font-sans font-bold text-lg">
                Anita, 28
              </Text>
              <Text className="text-gray font-sans">visited your profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View className="w-screen self-center border-b border-gray-200 h-[60] justify-center">
        <View className="w-[90%] self-center">
          <TouchableOpacity className="flex-row items-center gap-3">
            <Image
              source={require('../../assets/images/couple_bg.jpg')}
              className="h-[45] w-[45] rounded-3xl"
              resizeMode="cover"
            />
            <View className="flex-row items-center gap-1">
              <Text className="text-black font-sans font-bold text-lg">
                Anita, 28
              </Text>
              <Text className="text-gray font-sans">is interested in you</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </AppContainer>
  );
}
