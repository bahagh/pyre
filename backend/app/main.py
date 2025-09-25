from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.router import api_router
from app.ws.manager import manager



app = FastAPI(title=settings.PROJECT_NAME)


app.add_middleware(
CORSMiddleware,
allow_origins=[o.strip() for o in settings.CORS_ORIGINS.split(",")],
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)


app.include_router(api_router, prefix=settings.V1_PREFIX)

@app.get("/")
async def root():
    return {"service": "Pulseboard API", "docs": "/docs", "health": "/api/v1/healthz"}

@app.websocket("/ws/teams/{team_id}")
async def ws_team(websocket: WebSocket, team_id: int):
    room = f"team:{team_id}"
    await manager.connect(room, websocket)
    try:
        while True:
            data = await websocket.receive_json()
            await manager.broadcast(room, {"type": "checkin:new", "payload": data})
    except WebSocketDisconnect:
        manager.disconnect(room, websocket)