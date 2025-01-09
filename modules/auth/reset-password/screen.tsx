import {AppContainer} from '@/components/AppContainer';
import {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ResetPasswordForm} from './form';
export const ResetPasswordScreen = () => {
  const [form, setForm] = useState({email: ''});

  return (
    <AppContainer showBackButton barColor="dark-content">
      <ScrollView
        contentContainerStyle={{paddingBottom: 10}}
        showsVerticalScrollIndicator={false}>
        <View className="mb-3">
          <Text className="screen-title">Reset Password</Text>
          <Text className="screen-desc">
            Create a new password to secure your account and continue your
            journey with us.
          </Text>
        </View>
        <ResetPasswordForm />
      </ScrollView>
    </AppContainer>
  );
};