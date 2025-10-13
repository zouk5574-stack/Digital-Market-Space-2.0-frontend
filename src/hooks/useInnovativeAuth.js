import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import authService from '../services/authService';

export const useInnovativeAuth = () => {
  const [user, setUser] = useState(null);
  const queryClient = useQueryClient();

  const { data: userData, isLoading } = useQuery(
    'user',
    () => authService.getCurrentUser(),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    }
  );

  const loginMutation = useMutation(authService.login, {
    onSuccess: (userData) => {
      setUser(userData);
      queryClient.setQueryData('user', userData);
    },
    onError: (error) => {
      console.error('Login error:', error);
    }
  });

  const logoutMutation = useMutation(authService.logout, {
    onSuccess: () => {
      setUser(null);
      queryClient.setQueryData('user', null);
      queryClient.clear();
    }
  });

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  return {
    user,
    isLoading,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isLoading,
    isLoggingOut: logoutMutation.isLoading,
  };
};
