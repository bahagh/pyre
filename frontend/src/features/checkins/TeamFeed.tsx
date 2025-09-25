import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
const API = import.meta.env.VITE_API_BASE as string

export default function TeamFeed() {
  const { id } = useParams()
  const teamId = Number(id ?? 1)
  const qc = useQueryClient()
  const q = useQuery({ queryKey:['checkins', teamId], queryFn: async () => {
    const r = await fetch(`${API}/checkins/teams/${teamId}`); return r.json()
  }})
  const [text, setText] = useState(''); const [mood, setMood] = useState(3)
  const m = useMutation({
    mutationFn: async () => {
      const r = await fetch(`${API}/checkins`, { method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ team_id: teamId, text, mood, tags: [] }) })
      return r.json()
    },
    onSuccess: () => { setText(''); qc.invalidateQueries({queryKey:['checkins', teamId]}) }
  })
  return (
    <div className="space-y-4">
      <div className="card space-y-3">
        <h2 className="text-lg font-semibold">Post a check-in</h2>
        <textarea className="input h-24" value={text} onChange={e=>setText(e.target.value)} />
        <div className="flex items-center gap-3">
          <label className="text-sm text-muted">Mood</label>
          <input className="input w-24" type="number" min={1} max={5} value={mood} onChange={e=>setMood(+e.target.value)} />
          <button className="btn btn-primary" onClick={()=>m.mutate()} disabled={m.isLoading || !text.trim()}>
            {m.isLoading ? 'Posting…' : 'Post'}
          </button>
        </div>
      </div>
      <ul className="space-y-3">
        {(q.data ?? []).map((c:any) => (
          <li key={c.id} className="card">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted">{new Date(c.created_at).toLocaleString()}</div>
              <div className="text-sm font-semibold">Mood: {c.mood}</div>
            </div>
            <p className="mt-2">{c.text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
