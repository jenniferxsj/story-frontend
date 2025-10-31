import { useMutation, useQuery, type UseMutationOptions } from '@tanstack/react-query'

import { tokenStore } from '../auth/tokenStore'
import { http } from '../lib/http'
import type { TokenBundle, User } from '../types/auth'

export interface LoginPayload {
  email: string
  password: string
}

export interface SignupPayload {
  name: string
  email: string
  password: string
}

const queryParams = {
  retry: 1,
  retryDelay: 1000,
  staleTime: 5 * 60 * 1000
}

const loginRequest = async (payload: LoginPayload) => {
  const { data } = await http.post<TokenBundle>('/auth/login', payload)
  tokenStore.setAccess(data.accessToken)
  tokenStore.setJti(data.refreshJti)
  return data
}

const signupRequest = async <T = unknown>(payload: SignupPayload) => {
  const { data } = await http.post<T>('/auth/signup', payload)
  return data
}

const logoutRequest = async () => {
  await http.post('/auth/logout')
  tokenStore.clearAll()
}

export const useLogin = (
  options?: UseMutationOptions<TokenBundle, unknown, LoginPayload>,
) =>
  useMutation<TokenBundle, unknown, LoginPayload>({
    mutationFn: loginRequest,
    ...options,
  })

export const useLogout = (
  options?: UseMutationOptions<void, unknown, void>,
) =>
  useMutation<void, unknown, void>({
    mutationFn: logoutRequest,
    ...options,
  })

export const useSignup = <TData = unknown>(
  options?: UseMutationOptions<TData, unknown, SignupPayload>,
) =>
  useMutation<TData, unknown, SignupPayload>({
    mutationFn: async (payload) => signupRequest<TData>(payload),
    ...options,
  })

export const login = loginRequest
export const signup = signupRequest
export const logout = logoutRequest

export function useGetCurrentUser() {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      try {
        const res = await http.get<User>('/auth/currentUser')
        console.log('user data: ', res)
        return res?.data
      } catch {
        throw new Error('Error getting current user')
      }
    },
    ...queryParams
  });
};
