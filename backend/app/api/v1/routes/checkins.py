from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.deps import get_current_user, CurrentUser
from app.schemas.checkin import CheckinCreate, CheckinOut
from datetime import datetime


router = APIRouter(prefix="/checkins")


_FAKE_STORE: list[CheckinOut] = []


@router.get("/teams/{team_id}")
async def get_team_checkins(team_id: int) -> list[CheckinOut]:
    return [c for c in _FAKE_STORE if c.team_id == team_id]


@router.post("")
async def create_checkin(payload: CheckinCreate, user: CurrentUser = Depends(get_current_user)) -> CheckinOut:
    c = CheckinOut(
    id=len(_FAKE_STORE) + 1,
    team_id=payload.team_id,
    user_id=user.id,
    text=payload.text,
    mood=payload.mood,
    tags=payload.tags,
    created_at=datetime.utcnow(),
    )
    _FAKE_STORE.append(c)
    return c