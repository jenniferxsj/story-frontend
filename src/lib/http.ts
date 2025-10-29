import axios, { type AxiosError, type AxiosInstance } from 'axios'

import { tokenStore } from '../auth/tokenStore'
import { env } from '../config/env'
import type { TokenBundle } from '../types/auth'

const API_BASE_URL = env.apiBaseUrl.replace(/\/$/, '')

export const http: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

let refreshPromise: Promise<void> | null = null
let hasForcedLogout = false

http.interceptors.request.use((config) => {
  const accessToken = tokenStore.getAccess()
  if (accessToken) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status

    if (status !== 401) {
      return Promise.reject(error)
    }

    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          const jti = tokenStore.getJti()
          const { data } = await axios.post<TokenBundle>(
            `${API_BASE_URL}/auth/refresh`,
            null,
            {
              withCredentials: true,
              headers: jti ? { 'x-rt-jti': jti } : undefined,
            },
          )
          tokenStore.setAccess(data.accessToken)
          tokenStore.setJti(data.refreshJti)
          hasForcedLogout = false
        } catch (refreshError) {
          tokenStore.clearAll()
          if (typeof window !== 'undefined' && !hasForcedLogout) {
            hasForcedLogout = true
            const params = new URLSearchParams({ reason: 'expired' })
            params.set('back', window.location.pathname + window.location.search)
            window.location.replace(`/?${params.toString()}`)
          }
          throw refreshError
        } finally {
          refreshPromise = null
        }
      })()
    }

    try {
      await refreshPromise
    } catch (refreshError) {
      return Promise.reject(refreshError)
    }

    return Promise.reject(error)
  },
)
