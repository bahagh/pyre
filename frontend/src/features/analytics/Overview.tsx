import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
const API = import.meta.env.VITE_API_BASE as string
export default function Overview() {
  const { id } = useParams()
  const teamId = Number(id ?? 1)
  const q = useQuery({ queryKey:['overview', teamId], queryFn: async () => {
    const r = await fetch(`${API}/analytics/teams/${teamId}/overview`); return r.json()
  }})
  const d = q.data
  if (q.isLoading) return <div className="card">Loading…</div>
  if (q.error) return <div className="card text-red-600">Failed to load.</div>
  return (
    <div className="card space-y-2">
      <h2 className="text-lg font-semibold">Team {teamId} — Overview</h2>
      <div><span className="text-muted">Avg mood (14d):</span> <span className="font-semibold">{d.mood_avg_14d}</span></div>
      <div>
        <div className="text-muted">Top streaks</div>
        <ul className="list-disc pl-6">{d.streak_top.map((s:any,i:number)=>(<li key={i}>{s[0]} — {s[1]}</li>))}</ul>
      </div>
      <div>
        <div className="text-muted">Top blockers</div>
        <ul className="list-disc pl-6">{d.blockers_top.map((b:any,i:number)=>(<li key={i}>{b[0]} — {b[1]}</li>))}</ul>
      </div>
    </div>
  )
}
