export type UserRole = 'USER' | 'ADMIN' | 'BANNED'

export interface TokenBundle {
  accessToken: string
  accessTtlSeconds: number
  refreshToken: string
  refreshJti: string
  refreshExp: string
  role: UserRole
}

export interface User {
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
}