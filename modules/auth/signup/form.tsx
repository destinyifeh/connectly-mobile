import {AppButton} from '@/components/Button';
import {TextField} from '@/components/TextField';
import {useUserStore} from '@/stores/user-store';
import {zodResolver} from '@hookform/resolvers/zod';
import {useRouter} from 'expo-router';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Text, TouchableOpacity, View} from 'react-native';
import {z} from 'zod';
const signupSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, {message: 'Username must be at least 3 characters'}),
    phone: z.string().min(11, {message: 'Must be 10 or more characters long'}),
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
    // .regex(/[0-9]/, {message: 'Password must contain at least one number'}),
    email: z.string().trim().email({message: 'Invalid email address'}),
    confirmPassword: z.string().trim(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'], // This sets the error message on the `confirmPassword` field
  });

type formValue = {
  username: string;
  password: string;
  emmail: string;
  confirmPassword: string;
};

type signupFormData = z.infer<typeof signupSchema>;

export const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  const router = useRouter();
  const {setApplication, application, resetApplication} = useUserStore(
    state => state,
  );
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
  } = useForm<signupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const resetFormError = () => {
    clearErrors(['username', 'email', 'password', 'phone', 'confirmPassword']);
  };

  const onSubmitSignupData = (data: signupFormData) => {
    console.log(data, 'ss data');

    setIsLoading(true);
    resetFormError();
    const saveToDraft = {
      ...application,
      ...data,
    };

    //resetApplication();
    setApplication(saveToDraft);
    setTimeout(() => {
      setIsLoading(false);
      reset(); // Clear the form fields after submission
      router.replace('/complete-setup');
    }, 1000);
  };

  return (
    <View>
      <Controller
        name="username"
        control={control}
        //   rules={{required: 'Password is required'}}
        render={({field: {onChange, value}}) => (
          <TextField
            label="Username"
            placeholder="Enter your username"
            textContentType="username"
            //  onChangeText={username => setValue('username', username)}
            error={errors.username?.message}
            //{...register('username')}
            value={value}
            onChangeText={onChange}
            disabled={isLoading}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({field: {onChange, value}}) => (
          <TextField
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            textContentType="emailAddress"
            error={errors.email?.message}
            value={value}
            onChangeText={onChange}
            disabled={isLoading}
          />
        )}
      />
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
      <View className="mt-3">
        <Text className="screen-desc">
          By signing up, you agree to Connectly's
        </Text>
        <View className="flex-row items-center flex-wrap">
          <TouchableOpacity onPress={() => router.push('/terms-of-service')}>
            <Text className="screen-desc font-bold">
              Terms and conditions,{' '}
            </Text>
          </TouchableOpacity>
          <Text className="screen-desc"> Guidelines, and our </Text>

          <TouchableOpacity onPress={() => router.push('/privacy-policy')}>
            <Text className="screen-desc font-bold">Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AppButton
        title={isLoading ? 'Submitting...' : 'Continue'}
        onPress={handleSubmit(onSubmitSignupData)}
        disabled={isLoading || !isValid}
      />
      <View className="flex-row items-center self-center gap-2">
        <Text className="screen-desc">Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text className="text-app-default font-bold font-sans">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
