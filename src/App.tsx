import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { WelcomePage } from './pages/WelcomePage'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WelcomePage />} path="/" />
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardPage />} path="/dashboard" />
        </Route>
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
    </BrowserRouter>
  )
}

export default App
