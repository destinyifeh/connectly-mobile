import {AppContainer} from '@/components/AppContainer';
import {appContainerStyle} from '@/constants/Styles';
import {LinearGradient} from 'expo-linear-gradient';
import {useRouter} from 'expo-router';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const landingBg = require('../../assets/images/couple_bg.jpg');
export default function LandingScreen() {
  const router = useRouter();
  return (
    <AppContainer
      barColor="light-content"
      barTranslucent
      barBackground="transparent"
      showBackButton={true}
      allowContentContainer={false}>
      <ImageBackground source={landingBg} className="flex-1">
        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)']}
          style={{flex: 1}}>
          <View style={[appContainerStyle.appContent, {marginTop: 15}]}>
            <Text className="text-app-light text-center text-2xl font-bold font-sans">
              Connectly
            </Text>

            <View className="absolute bottom-10 w-full">
              <Text className="text-app-light text-3xl font-bold font-sans">
                Connect to Love with Connectly
              </Text>
              <Text className="text-white text-lg font-sans">
                Find, Connect, and Meet Your Perfect Match, Right Here, Right
                Now!
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/login')}
                className="bg-app-default h-[43px] rounded-3xl w-full justify-center my-5 mt-8">
                <Text className="text-app-dark text-center text-lg font-bold font-sans">
                  Get Started
                </Text>
              </TouchableOpacity>
              <View className="flex-row items-center ml-[80] gap-2">
                <Text className="text-white font-sans">
                  Haven't registered yet?{' '}
                </Text>
                <TouchableOpacity onPress={() => router.push('/signup')}>
                  <Text className="text-app-defaultMuted font-bold font-sans">
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: 'grey',
  },
  button: {
    width: 27,
    height: 27,
    backgroundColor: 'red',
    borderWidth: 0.5,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    marginBottom: 15,
  },
});
