import {AppContainer} from '@/components/AppContainer';
import {useGlobalStore} from '@/stores/global-store';
import {useRouter} from 'expo-router';
import {Image, Text, TouchableOpacity, View} from 'react-native';

export default function NotificationScreen() {
  const router = useRouter();
  const {themeColor} = useGlobalStore(state => state);
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
              <Text
                className="text-black font-sans font-bold text-lg"
                style={{color: themeColor.text}}>
                Anita, 28
              </Text>
              <Text
                className="text-gray font-sans"
                style={{color: themeColor.text}}>
                visited your profile
              </Text>
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
              <Text
                className="text-black font-sans font-bold text-lg"
                style={{color: themeColor.text}}>
                Anita, 28
              </Text>
              <Text
                className="text-gray font-sans"
                style={{color: themeColor.text}}>
                is interested in you
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </AppContainer>
  );
}
