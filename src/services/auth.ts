import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { apiClient } from '../lib/axios'

export interface LoginPayload {
  email: string
  password: string
}

export interface SignupPayload {
  name: string
  email: string
  password: string
}

export interface AuthResponse<T = unknown> {
  data: T
  message?: string
}

export const logout = async () => {
  const response = await apiClient.post<AuthResponse<void>>('/auth/logout')
  return response.data
}

export const signup = async <T = unknown>(payload: SignupPayload) => {
  const response = await apiClient.post<AuthResponse<T>>('/auth/signup', payload)
  return response.data
}

export const useLogin = <
  TData = unknown,
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<AuthResponse<TData>, TError, LoginPayload, TContext>,
) =>
  useMutation<AuthResponse<TData>, TError, LoginPayload, TContext>({
    mutationFn: async (payload) => {
      const response = await apiClient.post<AuthResponse<TData>>('/auth/login', payload)
      return response.data
    },
    ...options,
  })

export const useLogout = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<AuthResponse<void>, TError, void, TContext>,
) =>
  useMutation({
    mutationFn: () => logout(),
    ...options,
  })

export const useSignup = <
  TData = unknown,
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<AuthResponse<TData>, TError, SignupPayload, TContext>,
) =>
  useMutation({
    mutationFn: (payload) => signup<TData>(payload),
    ...options,
  })
