import {AppContainer} from '@/components/AppContainer';
import {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SignupForm} from './form';
export const SignupScreen = () => {
  const [form, setForm] = useState({email: ''});

  return (
    <AppContainer showBackButton barColor="dark-content">
      <ScrollView
        contentContainerStyle={{paddingBottom: 10}}
        showsVerticalScrollIndicator={false}>
        <View className="mb-3">
          <Text className="screen-title">Create Account</Text>
          <Text className="screen-desc">
            Sign up and Discover Effortless Connections to Your Perfect Match.
          </Text>
        </View>
        <SignupForm />
      </ScrollView>
    </AppContainer>
  );
};
