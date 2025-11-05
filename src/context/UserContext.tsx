import { createContext, useContext, type PropsWithChildren } from 'react'

import { useGetCurrentUser } from '../services/auth'
import type { User } from '../types/auth'

type UserQueryResult = ReturnType<typeof useGetCurrentUser>

interface UserContextValue {
  user: User | null
  isLoading: UserQueryResult['isLoading']
  isError: UserQueryResult['isError']
  error: UserQueryResult['error']
  refetch: UserQueryResult['refetch']
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: PropsWithChildren) {
  const { data, isLoading, isError, error, refetch } = useGetCurrentUser();

  const value: UserContextValue = {
    user: data ?? null,
    isLoading,
    isError,
    error,
    refetch,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  };

  return context;
}
