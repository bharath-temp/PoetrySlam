from datetime import datetime
from uuid import UUID
from enum import IntEnum

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


class UserProfile(BaseModel):
	id: UUID
	user_name: str
	full_name: str
	location: str
	years_experience: str
	


class PoemEntries(BaseModel):
	id: UUID
	user_name: str
	contentBody: str
	tags: Set[str] = set()
	timePublished: datetime = None

	class Config:
		orm_mode = True