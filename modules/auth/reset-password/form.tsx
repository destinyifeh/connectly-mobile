import {AppButton} from '@/components/Button';
import {TextField} from '@/components/TextField';
import {apiHookRequester} from '@/services/api/hooks';
import {zodResolver} from '@hookform/resolvers/zod';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ToastAndroid, View} from 'react-native';
import {z} from 'zod';
const signupSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(4, {message: 'Password must be 4 or more characters long'})
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'Password must contain at least one special character',
      })
      .regex(/[0-9]/, {message: 'Password must contain at least one number'}),

    confirmPassword: z.string().trim(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'], // This sets the error message on the `confirmPassword` field
  });

type formValue = {
  password: string;
  confirmPassword: string;
};

type resetPasswordFormData = z.infer<typeof signupSchema>;

export const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  const router = useRouter();
  const {email, previousRoute} = useLocalSearchParams();
  const {
    control,
    handleSubmit,
    register,
    setValue,
    reset,
    getValues,
    setError,
    clearErrors,
    formState: {errors, isValid, isSubmitting},
  } = useForm<resetPasswordFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const {mutate} = apiHookRequester.usePostData('/api/v1/user/new-password');

  const onSubmitResetData = (data: resetPasswordFormData) => {
    console.log(data, 'ss data', email, previousRoute);
    const payload = {
      ...data,
      email: email,
    };
    setIsLoading(true);
    mutate(payload, {
      onSuccess(data: any, variables, context) {
        console.log(data, 'data isSuccess');
        const {message} = data.data;
        reset();
        ToastAndroid.show(message, ToastAndroid.LONG);
        router.replace({
          pathname: '/login',
          params: {previousRoute: 'resetPasswordRoute'},
        });
      },
      onError(error: any, variables, context) {
        console.log(error, 'error submitting...');
        const {message} = error.data;

        setError('password', {
          type: 'server',
          message: message,
        });
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
        name="password"
        control={control}
        render={({field: {onChange, value}}) => (
          <TextField
            label="Password"
            placeholder="Enter your password"
            isPassword
            onPasswordVisible={() => setPasswordVisible(!passwordVisible)}
            secureTextEntry={!passwordVisible}
            error={errors.password?.message}
            value={value}
            onChangeText={onChange}
            disabled={isLoading}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({field: {onChange, value}}) => (
          <TextField
            label="Confirm Password"
            placeholder="Confirm your password"
            isPassword
            onPasswordVisible={() =>
              setConfirmPasswordVisible(!confirmPasswordVisible)
            }
            secureTextEntry={!confirmPasswordVisible}
            error={errors.confirmPassword?.message}
            value={value}
            onChangeText={onChange}
            disabled={isLoading}
          />
        )}
      />

      <AppButton
        title={isLoading ? 'Submitting...' : 'Continue'}
        onPress={handleSubmit(onSubmitResetData)}
        disabled={isLoading || !isValid}
      />
    </View>
  );
};
