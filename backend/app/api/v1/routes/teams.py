from fastapi import APIRouter

router = APIRouter(prefix="/teams", tags=["teams"])

@router.get("/", name="list_teams")
def list_teams():
    # Minimal demo data; replace with DB later
    return [{"id": 1, "name": "Demo Team"}]
