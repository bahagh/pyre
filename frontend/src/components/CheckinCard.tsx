export default function CheckinCard({ c }: { c: any }) {
  return (
    <li className="card">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted">{new Date(c.created_at).toLocaleString()}</div>
        <div className="text-sm font-semibold">Mood: {c.mood}</div>
      </div>
      <p className="mt-2">{c.text}</p>
      {c.tags?.length ? <div className="mt-2 text-sm text-muted">Tags: {c.tags.join(', ')}</div> : null}
    </li>
  )
}
