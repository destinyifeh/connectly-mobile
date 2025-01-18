import {AppButton} from '@/components/Button';
import {TextField} from '@/components/TextField';
import {useUserStore} from '@/stores/user-store';
import {zodResolver} from '@hookform/resolvers/zod';
import {useRouter} from 'expo-router';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Text, TouchableOpacity, View} from 'react-native';
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
  const {setUser, currentUser} = useUserStore(state => state);
  const onPasswordVisible = () => {
    console.log('yesss33');

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

  const onSubmitLoginData = (data: formData) => {
    console.log(data, 'dataa');

    setIsLoading(true);
    //clearErrors(['username', 'email', 'password', 'phone', 'confirmPassword']);
    setTimeout(() => {
      setIsLoading(false);
      reset(); // Clear the form fields after submission
      // setError('email', {
      //   //type: 'server',
      //   message: 'Incorrect email',
      // });

      const user = {
        ...currentUser,
        email: data.email,
      };
      setUser(user);

      router.push('/dashboard');
    }, 2000);
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
