from fastapi import APIRouter
from statistics import mean


router = APIRouter()


@router.get("/teams/{team_id}/overview")
async def team_overview(team_id: int):
# MVP stub values
    return {
    "team_id": team_id,
    "streak_top": [["demo@pulseboard.local", 3]],
    "blockers_top": [["CI flaky", 2]],
    "mood_avg_14d": 3.8,
    }