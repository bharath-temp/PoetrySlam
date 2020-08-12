from datetime import datetime
from typing import Optional, List
from uuid import UUID

from pydantic import BaseModel

from PoetrySlam import models


class Poem(BaseModel):
    title: str
    text: str
    upvotes: int
    downvotes: int
    author_id: UUID
    written_date: datetime
    poem_type: models.PoemType

    class Config:
        orm_mode = True


class User(BaseModel):
    username: str
    email: str
    hashed_password: str
    is_active: bool = None
    disabled: bool = None
    # poems = List[Poem]

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None
