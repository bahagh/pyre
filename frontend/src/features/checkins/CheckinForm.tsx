import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { api } from '../../lib/api'


export default function CheckinForm({ teamId }: { teamId: number }) {
const qc = useQueryClient()
const [text, setText] = useState('')
const [mood, setMood] = useState(3)
const m = useMutation(
async () => (await api.post('/checkins', { team_id: teamId, text, mood, tags: [] })).data,
{ onSuccess: () => { setText(''); qc.invalidateQueries(['checkins', teamId]) } }
)
return (
<div>
<textarea value={text} onChange={(e) => setText(e.target.value)} />
<input type="number" value={mood} min={1} max={5} onChange={(e) => setMood(+e.target.value)} />
<button onClick={() => m.mutate()} disabled={m.isLoading}>Post</button>
</div>
)
}