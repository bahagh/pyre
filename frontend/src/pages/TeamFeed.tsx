import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { api } from '../lib/api'
import CheckinCard from '../components/CheckinCard'

export default function TeamFeed() {
  const { id } = useParams()
  const teamId = Number(id ?? 1)
  const qc = useQueryClient()
  const q = useQuery(['checkins', teamId], () => api.listCheckins(teamId))
  const [text, setText] = useState('')
  const [mood, setMood] = useState(3)

  const m = useMutation(() => api.createCheckin({ team_id: teamId, text, mood, tags: [] }), {
    onSuccess: () => { setText(''); qc.invalidateQueries(['checkins', teamId]) }
  })

  return (
    <div className="space-y-4">
      <div className="card space-y-3">
        <h2 className="text-lg font-semibold">Post a check-in</h2>
        <textarea className="input h-24" value={text} onChange={(e)=>setText(e.target.value)} placeholder="What are you working on? Any blockers?" />
        <div className="flex items-center gap-3">
          <label className="text-sm text-muted">Mood</label>
          <input className="input w-24" type="number" min={1} max={5} value={mood} onChange={(e)=>setMood(+e.target.value)} />
          <button className="btn btn-primary" onClick={()=>m.mutate()} disabled={m.isLoading || !text.trim()}>
            {m.isLoading ? 'Posting…' : 'Post'}
          </button>
        </div>
      </div>

      <ul className="space-y-3">
        {(q.data ?? []).map((c:any) => <CheckinCard key={c.id} c={c} />)}
      </ul>
    </div>
  )
}
