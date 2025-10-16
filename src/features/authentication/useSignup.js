import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(
        'Signup successful! Please check your email to verify your account.'
      );
    },
    onError: (error) => {
      console.error('Signup error:', error);
      toast.error(`Signup failed: ${error.message}`);
    },
  });

  return { signup, isLoading };
}
