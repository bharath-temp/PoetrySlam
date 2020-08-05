from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class User(BaseModel):
    id: UUID
    user_name: str
    email: str
    hashed_password: str
    is_active: bool = None
    account_created: datetime = None

    class Config:
        orm_mode = True
