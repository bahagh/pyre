import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { AuthProvider } from '../lib/useAuth'

export default function Layout() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Navbar />
        <main className="container-narrow py-6">
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  )
}
