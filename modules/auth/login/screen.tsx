import {AppContainer} from '@/components/AppContainer';
import {useGlobalStore} from '@/stores/global-store';
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useRouter} from 'expo-router';
import {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {LoginForm} from './form';
export const LoginScreen = () => {
  const [form, setForm] = useState({email: ''});
  const {themeColor} = useGlobalStore(state => state);
  const router = useRouter();

  GoogleSignin.configure();
  const onGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        console.log(response, 'respooo');
        // setState({ userInfo: response.data });
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log('in progress');
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            console.log('ot available');
            break;
          default:
            // some other error happened
            console.log('other issues');
        }
      } else {
        // an error that's not related to google sign in occurred
        console.log('Some other issues');
      }
    }
  };

  return (
    <AppContainer showBackButton barColor="dark-content">
      <ScrollView
        contentContainerStyle={{paddingBottom: 10}}
        showsVerticalScrollIndicator={false}>
        <View className="mb-3">
          <Text className="screen-title" style={{color: themeColor.text}}>
            Login
          </Text>

          <Text className="screen-desc">
            Log in and Discover Effortless Connections to Your Perfect Match.
          </Text>
        </View>
        <LoginForm />

        <View className="flex-row items-center gap-2 self-center mt-1">
          <View className="h-[1] w-[50%] bg-gray-300" />
          <Text className="text-gray-300 font-sans font-bold text-base">
            OR
          </Text>
          <View className="h-[1] w-[50%] bg-gray-300" />
        </View>

        <View className="mt-7">
          <TouchableOpacity
            onPress={onGoogleSignIn}
            className="border border-gray-300 h-[40.7] rounded-3xl flex-row items-center justify-center px-3 w-full gap-[5]">
            <Image
              source={require('../../../assets/images/google_brand_image.png')}
              resizeMode="contain"
              className="w-[25]"
            />
            <Text
              className="text-app-dark font-sans text-lg font-bold"
              style={{color: themeColor.text}}>
              Login with Google
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center self-center gap-1 mt-5">
          <Text className="screen-desc">Haven't registered yet? </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text className="text-app-default font-bold font-sans text-base">
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppContainer>
  );
};
