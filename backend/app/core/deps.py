from __future__ import annotations

from typing import Optional
from fastapi import Header
from pydantic import BaseModel


class CurrentUser(BaseModel):
    id: int = 1
    email: str = "demo@example.com"
    role: str = "member"


async def get_current_user(authorization: Optional[str] = Header(None)) -> CurrentUser:
    """
    Dev/demo dependency:
    - Accepts Authorization: Bearer <token>
    - If token is 'demo' (or missing), returns a fixed demo user
    - In real auth, verify JWT here and load the user
    """
    token: Optional[str] = None
    if authorization and authorization.lower().startswith("bearer "):
        token = authorization.split(" ", 1)[1].strip()

    if not token or token == "demo":
        return CurrentUser()

    # TODO: verify JWT and fetch user from DB; for now still return a stub user
    return CurrentUser()
