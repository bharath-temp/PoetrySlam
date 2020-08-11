from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class User(BaseModel):
    id: UUID
    username: str
    email: str
    hashed_password: str
    is_active: bool = None
    account_created: datetime = None
    disabled: bool = None

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None
