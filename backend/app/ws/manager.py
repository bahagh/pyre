from typing import Dict, Set
from fastapi import WebSocket

class WSManager:
    def __init__(self):
        self.rooms: Dict[str, Set[WebSocket]] = {}

    async def connect(self, room: str, ws: WebSocket):
        await ws.accept()
        self.rooms.setdefault(room, set()).add(ws)

    def disconnect(self, room: str, ws: WebSocket):
        self.rooms.get(room, set()).discard(ws)

    async def broadcast(self, room: str, message: dict):
        for ws in list(self.rooms.get(room, set())):
            await ws.send_json(message)

manager = WSManager()
