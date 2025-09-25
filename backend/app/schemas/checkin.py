from datetime import datetime
from pydantic import BaseModel, Field


class CheckinCreate(BaseModel):
    team_id: int
    text: str
    mood: int = Field(ge=1, le=5)
    tags: list[str] = []


class CheckinOut(BaseModel):
    id: int
    team_id: int
    user_id: int
    text: str
    mood: int
    tags: list[str]
    created_at: datetime
class Config:
    from_attributes = True