import {AppContainer} from '@/components/AppContainer';
import {AppButton} from '@/components/Button';
import {TextField} from '@/components/TextField';
import {apiHookRequester} from '@/services/api/hooks';
import {useUserStore} from '@/stores/user-store';
import {zodResolver} from '@hookform/resolvers/zod';
import {useRouter} from 'expo-router';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Toast} from 'toastify-react-native';
import {z} from 'zod';
type formData = {
  password: string;
  confirmPassword: string;
};

const dataSchema = z
  .object({
    confirmPassword: z.string().trim(),
    password: z
      .string()
      .trim()
      .min(4, {message: 'Password must be 4 or more characters long'})
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'Password must contain at least one special character',
      }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'], // This sets the error message on the `confirmPassword` field
  });
export const ChangePasswordScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  const {currentUser, logoutUser} = useUserStore(state => state);
  const {mutate} = apiHookRequester.useUpdateData(
    `/api/v1/user/change-password/${currentUser._id}`,
  );
  const router = useRouter();

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

    const payload = {
      password: data.password,
    };

    mutate(payload, {
      onSuccess(data: any, variables, context) {
        console.log(data, 'data issuccess');
        reset();
        const {message} = data.data;
        Toast.success(message, 'bottom');
        logoutUser();
      },
      onError(error: any, variables, context) {
        console.log(error, 'erorr ocurred');
        const {message} = error.data;
        setError('password', {
          type: 'server',
          message: message,
        });
      },
      onSettled(data, error, variables, context) {
        setIsLoading(false);
      },
    });
  };

  return (
    <AppContainer showBackButton showScreenTitle title="Change Password">
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
        title={isLoading ? 'Please wait...' : 'Continue'}
        onPress={handleSubmit(onSubmitData)}
        disabled={isLoading || !isValid}
      />
    </AppContainer>
  );
};

export default ChangePasswordScreen;
