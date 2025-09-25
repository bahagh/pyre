# backend/app/api/v1/routes/auth.py
from fastapi import APIRouter
from pydantic import BaseModel, EmailStr

router = APIRouter(prefix="/auth")

class LoginBody(BaseModel):
    email: EmailStr

@router.post("/login")
async def login(body: LoginBody):
    # Demo token; replace with real JWT later
    return {"access_token": "demo", "token_type": "bearer"}
