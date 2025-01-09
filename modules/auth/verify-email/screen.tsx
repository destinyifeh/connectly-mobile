import {AppContainer} from '@/components/AppContainer';
import {useRouter} from 'expo-router';
import {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {VerifyEmailForm} from './form';
export const VerifyEmailScreen = () => {
  const [form, setForm] = useState({email: ''});

  const router = useRouter();

  return (
    <AppContainer showBackButton barColor="dark-content">
      <ScrollView
        contentContainerStyle={{paddingBottom: 10}}
        showsVerticalScrollIndicator={false}>
        <View className="mb-3">
          <Text className="screen-title">Confirm your email</Text>
          <Text className="screen-desc">
            Enter the code we just sent to{' '}
            <Text className="font-bold font-sans">deed@g.com,</Text> if you
            don't see it, please check your spam folder.
          </Text>
        </View>
        <VerifyEmailForm />
      </ScrollView>
    </AppContainer>
  );
};
