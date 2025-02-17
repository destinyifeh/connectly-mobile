import {AppContainer} from '@/components/AppContainer';
import {useGlobalStore} from '@/stores/global-store';
import {useUserStore} from '@/stores/user-store';
import {zodResolver} from '@hookform/resolvers/zod';
import {useRouter} from 'expo-router';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Text, View} from 'react-native';
import {z} from 'zod';
type formData = {
  phone: string;
};

const dataSchema = z.object({
  phone: z.string().min(11, {message: 'Must be 10 or more characters long'}),
});
export const BasicInfoScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const router = useRouter();
  const {currentUser} = useUserStore(state => state);
  const {themeColor} = useGlobalStore(state => state);
  const {
    control,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: {errors, isValid},
  } = useForm<formData>({
    resolver: zodResolver(dataSchema),
    mode: 'onChange',
  });

  const onSubmitData = (data: formData) => {
    console.log(data, 'dataa');

    setIsLoading(true);
    //clearErrors(['username', 'email', 'password', 'phone', 'confirmPassword']);
    setTimeout(() => {
      setIsLoading(false);
      reset(); // Clear the form fields after submission
      setError('phone', {
        //type: 'server',
        message: 'Incorrect phone',
      });

      router.back();
    }, 2000);
  };

  return (
    <AppContainer showBackButton showScreenTitle title="Basic Info">
      <View className="border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
        <Text
          className="font-sans font-bold text-base "
          style={{color: themeColor.text}}>
          Username
        </Text>
        <Text className="font-sans capitalize" style={{color: themeColor.text}}>
          {currentUser.username}
        </Text>
      </View>

      <View className="border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
        <Text
          className="font-sans font-bold text-base"
          style={{color: themeColor.text}}>
          Gender
        </Text>
        <Text className="font-sans capitalize" style={{color: themeColor.text}}>
          {currentUser.gender}
        </Text>
      </View>
      <View className="border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
        <Text
          className="text-base font-sans font-bold"
          style={{color: themeColor.text}}>
          Birthday
        </Text>
        <Text className="text-black font-sans" style={{color: themeColor.text}}>
          {currentUser.dob}
        </Text>
      </View>
      <View className="border border-gray-300 flex-row justify-between items-center h-[50] rounded-lg px-5 my-3">
        <Text
          className="text-base font-sans font-bold"
          style={{color: themeColor.text}}>
          Email
        </Text>
        <Text className="font-sans" style={{color: themeColor.text}}>
          {currentUser.email}
        </Text>
      </View>
    </AppContainer>
  );
};

export default BasicInfoScreen;
