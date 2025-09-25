from pydantic import BaseModel


class TeamOverview(BaseModel):
    team_id: int
    streak_top: list[tuple[str, int]]
    blockers_top: list[tuple[str, int]]
    mood_avg_14d: float