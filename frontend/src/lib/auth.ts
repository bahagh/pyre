export async function demoLogin(email: string) {
const res = await fetch(`${import.meta.env.VITE_API_BASE}/auth/login`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ email })
})
const data = await res.json()
localStorage.setItem('token', data.access_token)
}