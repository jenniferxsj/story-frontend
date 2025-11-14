import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { WelcomePage } from './pages/WelcomePage'
import DashboardPage from './pages/DashboardPage'
import { AppLayout } from './layouts/AppLayout'
import BookReportPage from './pages/BookReportPage'
import StoryPage from './pages/StoryPage'
import StoryOutlinesPage from './pages/StoryOutlinesPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WelcomePage />} path="/" />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route element={<DashboardPage />} path="/dashboard" />
            <Route element={<BookReportPage />} path="/reports" />
            <Route element={<StoryPage />} path="/stories" />
            <Route element={<StoryOutlinesPage />} path="/stories/outlines" />
          </Route>
        </Route>
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
    </BrowserRouter>
  )
}

export default App
