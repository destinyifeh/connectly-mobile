import {AppContainer} from '@/components/AppContainer';
import {globalStore} from '@/stores/global-store';
import {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SignupForm} from './form';
export const SignupScreen = () => {
  const [form, setForm] = useState({email: ''});
  const {themeColor} = globalStore(state => state);
  return (
    <AppContainer showBackButton barColor="dark-content">
      <ScrollView
        contentContainerStyle={{paddingBottom: 10}}
        showsVerticalScrollIndicator={false}>
        <View className="mb-3">
          <Text className="screen-title" style={{color: themeColor.text}}>
            Create Account
          </Text>
          <Text className="screen-desc">
            Sign up and Discover Effortless Connections to Your Perfect Match.
          </Text>
        </View>
        <SignupForm />
      </ScrollView>
    </AppContainer>
  );
};
