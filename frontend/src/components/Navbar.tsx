import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/useAuth'

export default function Navbar() {
  const { token, setToken } = useAuth()
  const nav = useNavigate()
  const logout = () => { setToken(null); nav('/login') }
  const linkClass = ({ isActive }: any) =>
    `px-3 py-2 rounded-xl ${isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'}`
  return (
    <header className="border-b bg-white">
      <div className="container-narrow flex items-center justify-between h-16">
        <Link to="/" className="font-semibold">Pulseboard</Link>
        <nav className="flex gap-2 items-center">
          <NavLink to="/teams/1" className={linkClass}>Feed</NavLink>
          <NavLink to="/analytics/1" className={linkClass}>Analytics</NavLink>
          {token ? (
            <button className="btn" onClick={logout}>Logout</button>
          ) : (
            <NavLink to="/login" className={linkClass}>Login</NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}
