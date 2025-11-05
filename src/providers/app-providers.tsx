import { QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'

import { queryClient } from '../lib/queryClient'
import { UserProvider } from '../context/UserContext'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>{children}</UserProvider>
    </QueryClientProvider>
  )
}
