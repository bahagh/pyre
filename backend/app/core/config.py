# backend/app/core/config.py
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

# Resolve repo root: backend/app/core -> up 3 levels -> project root
ROOT_DIR = Path(__file__).resolve().parents[3]

class Settings(BaseSettings):
    PROJECT_NAME: str = "Pulseboard"
    ENV: str = "dev"

    DATABASE_URL: str
    REDIS_URL: str

    JWT_SECRET: str
    JWT_EXPIRE_MINUTES: int = 60

    CORS_ORIGINS: str = "http://localhost:5173"
    V1_PREFIX: str = "/api/v1"

    # pydantic-settings v2 configuration
    model_config = SettingsConfigDict(
        env_file=str(ROOT_DIR / ".env"),
        extra="ignore",
    )

settings = Settings()
