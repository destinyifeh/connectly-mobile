import {AppContainer} from '@/components/AppContainer';
import {useRouter} from 'expo-router';
import {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {CompleteSetupForm} from './form';
export const CompleteSetupScreen = () => {
  const [form, setForm] = useState({email: ''});

  const router = useRouter();

  return (
    <AppContainer showBackButton barColor="dark-content">
      <ScrollView
        contentContainerStyle={{paddingBottom: 10, flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View className="mb-3">
          <Text className="screen-title">Setup Account</Text>
          <Text className="screen-desc">
            Let's complete your setup process.
          </Text>
        </View>
        <CompleteSetupForm />
      </ScrollView>
    </AppContainer>
  );
};
