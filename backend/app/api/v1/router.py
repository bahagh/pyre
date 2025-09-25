from fastapi import APIRouter
from .routes import health, auth, me, teams, checkins, analytics

api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])
api_router.include_router(auth.router, tags=["auth"])
api_router.include_router(me.router, tags=["me"])
api_router.include_router(teams.router, tags=["teams"])
api_router.include_router(checkins.router, tags=["checkins"])
api_router.include_router(analytics.router, tags=["analytics"])
