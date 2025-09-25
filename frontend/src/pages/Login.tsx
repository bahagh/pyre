import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'

export default function Login() {
  const [email, setEmail] = useState('demo@example.com')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const nav = useNavigate()

  const onSubmit = async () => {
    setError(null); setLoading(true)
    try {
      const { data } = await api.post('/auth/login', { email })
      const token = data?.access_token ?? 'demo'
      localStorage.setItem('token', token)
      nav('/teams/1')
    } catch (e: any) {
      setError(e?.response?.data?.detail || e?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  return (
    <div className="max-w-md mx-auto">
      <div className="card space-y-4">
        <h1 className="text-2xl font-semibold">Pulseboard — Demo Login</h1>
        <p className="text-muted">Use any valid-looking email (e.g. demo@example.com)</p>
        <input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" />
        <button className="btn btn-primary w-full" onClick={onSubmit} disabled={loading || !emailValid}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
        {error && <p className="text-sm text-red-600">{String(error)}</p>}
      </div>
    </div>
  )
}
