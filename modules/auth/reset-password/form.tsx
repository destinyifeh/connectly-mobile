import {AppButton} from '@/components/Button';
import {TextField} from '@/components/TextField';
import {zodResolver} from '@hookform/resolvers/zod';
import {useRouter} from 'expo-router';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
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

  const onSubmitSignupData = (data: resetPasswordFormData) => {
    console.log(data, 'ss data');

    setIsLoading(true);
    clearErrors(['password', 'confirmPassword']);
    setTimeout(() => {
      setIsLoading(false);
      reset(); // Clear the form fields after submission
      setError('password', {
        //type: 'server',
        message: 'User already exists',
      });
      router.push('/dashboard');
    }, 2000);
  };

  // const onSubmit = async (data) => {
  //   try {
  //     const response = await fakeApiCall(data);

  //     // If successful, proceed with your logic
  //     console.log("Form submitted:", response);
  //   } catch (error) {
  //     // Assuming error.response.data.message contains a generic message
  //     const serverMessage = error.response.data.message;

  //     if (serverMessage === "User already exists") {
  //       // Set the error to the 'username' field
  //       setError("username", {
  //         type: "server",
  //         message: "User already exists",
  //       });
  //     }
  //   }
  // };

  return (
    <>
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
        onPress={handleSubmit(onSubmitSignupData)}
        disabled={isLoading || !isValid}
      />
    </>
  );
};
