from fastapi import APIRouter, Depends
from app.core.deps import get_current_user, CurrentUser


router = APIRouter()


@router.get("/me")
async def me(user: CurrentUser = Depends(get_current_user)):
    return {"id": user.id, "email": "demo@pulseboard.local", "name": "Demo User"}