import { Link } from 'react-router-dom'
export default function NotFound(){
  return (
    <div className="card">
      <h1 className="text-2xl font-semibold">404 — Not Found</h1>
      <p className="text-muted mt-2">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="btn mt-4">Go home</Link>
    </div>
  )
}
