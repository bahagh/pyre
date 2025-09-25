export function teamSocket(teamId: number) {
const url = new URL(`/ws/teams/${teamId}`, window.location.origin)
url.protocol = url.protocol.replace('http', 'ws')
return new WebSocket(url)
}