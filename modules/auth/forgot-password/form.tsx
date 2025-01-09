import {AppButton} from '@/components/Button';
import {TextField} from '@/components/TextField';
import {zodResolver} from '@hookform/resolvers/zod';
import {useRouter} from 'expo-router';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {z} from 'zod';
type formData = {
  email: string;
};

const forgotDataSchema = z.object({
  email: z.string().trim().email({message: 'Invalid email address'}),
});
export const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: {errors, isValid},
  } = useForm<formData>({
    resolver: zodResolver(forgotDataSchema),
    mode: 'onChange',
  });

  const onSubmitLoginData = (data: formData) => {
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

      router.push('/verify-email');
    }, 2000);
  };

  return (
    <>
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
        onPress={handleSubmit(onSubmitLoginData)}
        disabled={isLoading || !isValid}
      />
    </>
  );
};
