import {AppContainer} from '@/components/AppContainer';
import {AppButton} from '@/components/Button';
import {TextField} from '@/components/TextField';
import {globalStore} from '@/stores/global-store';
import {zodResolver} from '@hookform/resolvers/zod';
import {useRouter} from 'expo-router';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {z} from 'zod';
type formData = {
  email: string;
};

const dataSchema = z.object({
  email: z.string().trim().email({message: 'Invalid email address'}),
});
export const ChangeEmailScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const router = useRouter();
  const {themeColor} = globalStore(state => state);
  console.log(themeColor, 'state theme');
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
      setError('email', {
        //type: 'server',
        message: 'Incorrect email',
      });

      router.back();
    }, 2000);
  };

  return (
    <AppContainer showBackButton showScreenTitle title="Change Email">
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

      <AppButton
        title={isLoading ? 'Please wait...' : 'Continue'}
        onPress={handleSubmit(onSubmitData)}
        disabled={isLoading || !isValid}
      />
    </AppContainer>
  );
};

export default ChangeEmailScreen;
