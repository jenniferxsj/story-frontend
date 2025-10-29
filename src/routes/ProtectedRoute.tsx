import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { tokenStore } from '../auth/tokenStore'

export function ProtectedRoute() {
  const location = useLocation()
  const isAuthenticated = Boolean(tokenStore.getAccess())

  if (!isAuthenticated) {
    const params = new URLSearchParams({ reason: 'auth' })
    params.set('back', location.pathname + location.search)
    return <Navigate replace to={`/?${params.toString()}`} />
  }

  return <Outlet />
}
