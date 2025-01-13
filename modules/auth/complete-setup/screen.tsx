import {AppContainer} from '@/components/AppContainer';
import {globalStore} from '@/stores/global-store';
import {useRouter} from 'expo-router';
import {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {CompleteSetupForm} from './form';
export const CompleteSetupScreen = () => {
  const [form, setForm] = useState({email: ''});
  const {themeColor} = globalStore(state => state);
  const router = useRouter();

  return (
    <AppContainer showBackButton barColor="dark-content">
      <ScrollView
        contentContainerStyle={{paddingBottom: 10, flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View className="mb-3">
          <Text className="screen-title" style={{color: themeColor.text}}>
            Setup Account
          </Text>
          <Text className="screen-desc">
            Let's complete your setup process.
          </Text>
        </View>
        <CompleteSetupForm />
      </ScrollView>
    </AppContainer>
  );
};
