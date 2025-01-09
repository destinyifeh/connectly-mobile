import {AppContainer} from '@/components/AppContainer';
import {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ForgotPasswordForm} from './form';
export const ForgotPasswordScreen = () => {
  const [form, setForm] = useState({email: ''});

  return (
    <AppContainer showBackButton barColor="dark-content">
      <ScrollView
        contentContainerStyle={{paddingBottom: 10}}
        showsVerticalScrollIndicator={false}>
        <View className="mb-3">
          <Text className="screen-title">Forgot Your Password?</Text>
          <Text className="screen-desc">
            Enter your registered email address to reset your password and
            regain access to your account.
          </Text>
        </View>
        <ForgotPasswordForm />
      </ScrollView>
    </AppContainer>
  );
};
