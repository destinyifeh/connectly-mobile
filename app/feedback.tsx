import {AppContainer} from '@/components/AppContainer';
import {AppButton} from '@/components/Button';
import {TextField} from '@/components/TextField';
import {zodResolver} from '@hookform/resolvers/zod';
import {useFocusEffect, useRouter} from 'expo-router';
import {useCallback, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ScrollView, TextInput, View} from 'react-native';
import {z} from 'zod';

type formData = {
  feedback: string;
};

const feedbackDataSchema = z.object({
  feedback: z.string().trim().min(1, {message: 'Required'}),
});

export default function FeedbackScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const ref = useRef<TextInput | null>(null);

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        ref.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }, []),
  );

  const {
    control,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: {errors, isValid},
  } = useForm<formData>({
    resolver: zodResolver(feedbackDataSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: formData) => {
    console.log(data, 'dataa');

    setIsLoading(true);
    //clearErrors(['username', 'email', 'password', 'phone', 'confirmPassword']);
    setTimeout(() => {
      setIsLoading(false);
      reset(); // Clear the form fields after submission
      setError('feedback', {
        //type: 'server',
        message: 'Incorrect',
      });

      router.push('/dashboard');
    }, 2000);
  };
  return (
    <AppContainer showBackButton showScreenTitle title="Support">
      <ScrollView
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}>
        <Controller
          name="feedback"
          control={control}
          render={({field: {onChange, value}}) => (
            <TextField
              multiline
              numberOfLines={8}
              placeholder="Your feedback..."
              onChangeText={onChange}
              value={value}
              error={errors.feedback?.message}
              disabled={isLoading}
              ref={ref}
            />
          )}
        />

        <View>
          <AppButton
            title={isLoading ? 'Please wait...' : 'Send'}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading || !isValid}
          />
        </View>
      </ScrollView>
    </AppContainer>
  );
}
