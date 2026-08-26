from functools import lru_cache
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    api_key: str = Field(default="local-development-only", min_length=12)
    model_dir: Path = Path("prototype/model")
    log_level: str = "INFO"

    @property
    def model_path(self) -> Path:
        return self.model_dir / "model.joblib"

    @property
    def digest_path(self) -> Path:
        return self.model_dir / "model.joblib.sha256"


@lru_cache
def get_settings() -> Settings:
    return Settings()
