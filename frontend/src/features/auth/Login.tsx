import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../lib/api'

export default function Login() {
  const [email, setEmail] = useState('demo@example.com')
  const nav = useNavigate()

  async function handleLogin() {
    try {
      const res = await api.post('/auth/login', { email })
      const token = res.data.access_token
      localStorage.setItem('token', token)
      nav('/teams/1')
    } catch (err) {
      console.error('Login failed:', err)
      alert('Login failed, check console')
    }
  }

  return (
    <div className="container-narrow py-8">
      <h1 className="text-2xl font-bold mb-4">Pulseboard – Demo Login</h1>
      <input
        className="input mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleLogin}>
        Sign in
      </button>
    </div>
  )
}
