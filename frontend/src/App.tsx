import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Login from './features/auth/Login'
import TeamFeed from './features/checkins/TeamFeed'
import Overview from './features/analytics/Overview'
import { useEffect, useState } from 'react'

function useAuth() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))
  useEffect(() => {
    const onStorage = () => setToken(localStorage.getItem('token'))
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])
  return { token, setToken }
}

function RequireAuth() {
  const { token } = useAuth()
  return token ? <Outlet /> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/teams/:id" element={<TeamFeed />} />
        <Route path="/analytics/:id" element={<Overview />} />
      </Route>
      <Route path="*" element={<Navigate to="/teams/1" replace />} />
    </Routes>
  )
}
