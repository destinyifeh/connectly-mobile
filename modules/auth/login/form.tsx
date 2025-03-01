import {AppButton} from '@/components/Button';
import {TextField} from '@/components/TextField';
import {
  ACCESS_TOKEN_KEY,
  CURRENT_USER,
  REFRESH_TOKEN_KEY,
} from '@/constants/config';
import {apiHookRequester} from '@/services/api/hooks';
import {getDeviceData, saveDeviceData} from '@/stores/device-store';
import {useUserStore} from '@/stores/user-store';
import {zodResolver} from '@hookform/resolvers/zod';
import {useRouter} from 'expo-router';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Text, TouchableOpacity, View} from 'react-native';
import {Toast} from 'toastify-react-native';
import {z} from 'zod';
type formData = {
  email: string;
  password: string;
};

const loginDataSchema = z.object({
  email: z.string().trim().email({message: 'Invalid email address'}),
  password: z.string().trim().min(1, {message: 'Required'}),
});
export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const router = useRouter();
  const {setCurrentUser, currentUser} = useUserStore(state => state);
  const {mutate} = apiHookRequester.usePostData('/api/v1/user/login');

  const onPasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  const {
    control,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: {errors, isValid},
  } = useForm<formData>({
    resolver: zodResolver(loginDataSchema),
    mode: 'onChange',
  });

  const onSubmitLoginData = async (data: formData) => {
    console.log(data, 'dataa');
    const data1 = await getDeviceData(ACCESS_TOKEN_KEY);
    const data2 = await getDeviceData(REFRESH_TOKEN_KEY);
    const data3 = await getDeviceData(CURRENT_USER);
    console.log({data1, data2, data3});
    clearErrors(['email', 'password']);

    const payload = {
      ...data,
    };
    setIsLoading(true);
    mutate(payload, {
      onSuccess(data: any, variables, context) {
        console.log(data, 'data isSuccess');
        const {message, user, accessToken, refreshToken} = data.data;
        setCurrentUser(user);
        saveDeviceData(ACCESS_TOKEN_KEY, accessToken);
        saveDeviceData(REFRESH_TOKEN_KEY, refreshToken);
        reset();
        router.replace({
          pathname: '/dashboard',
          params: {previousRoute: 'login'},
        });
      },
      onError(error: any, variables, context) {
        console.log(error, 'error submitting...');
        const {message} = error?.data || {};
        if (message === 'Incorrect credentials') {
          setError('password', {
            type: 'server',
            message: message,
          });
          return;
        }
        if (message === 'User not found') {
          setError('email', {
            type: 'server',
            message: message,
          });
          return;
        }

        Toast.error(message || 'Oops! Something went wrong', 'bottom');
      },
      onSettled(data, error, variables, context) {
        setIsLoading(false);
        console.log(data, 'final data');
      },
    });
  };

  return (
    <View>
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Required',
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextField
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            textContentType="emailAddress"
            onChangeText={onChange}
            value={value}
            error={errors.email?.message}
            disabled={isLoading}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({field: {onChange, value}}) => (
          <TextField
            label="Password"
            placeholder="Enter your password"
            isPassword
            onPasswordVisible={onPasswordVisible}
            secureTextEntry={!passwordVisible}
            onChangeText={onChange}
            value={value}
            error={errors.password?.message}
            disabled={isLoading}
          />
        )}
      />
      <TouchableOpacity
        className="self-end mt-1"
        onPress={() => router.push('/forgot-password')}>
        <Text className="screen-desc font-bold">Forgot Password?</Text>
      </TouchableOpacity>
      <AppButton
        title={isLoading ? 'Please wait...' : 'Continue'}
        onPress={handleSubmit(onSubmitLoginData)}
        disabled={isLoading || !isValid}
      />
    </View>
  );
};
