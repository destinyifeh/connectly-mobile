import {AppContainer} from '@/components/AppContainer';
import {AppButton} from '@/components/Button';
import {TextField} from '@/components/TextField';
import {zodResolver} from '@hookform/resolvers/zod';
import {useRouter} from 'expo-router';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {z} from 'zod';
type formData = {
  phone: string;
};

const dataSchema = z.object({
  phone: z.string().min(11, {message: 'Must be 10 or more characters long'}),
});
export const ChangePhoneScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
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
    <AppContainer showBackButton showScreenTitle title="Change Phone">
      <Controller
        name="phone"
        control={control}
        render={({field: {onChange, value}}) => (
          <TextField
            label="Phone Number"
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            error={errors.phone?.message}
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

export default ChangePhoneScreen;
