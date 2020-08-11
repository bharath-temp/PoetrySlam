import datetime

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy_utils import UUIDType
from sqlalchemy.orm import relationship

from PoetrySlam.mixins import SurrogatePK

Base = declarative_base()


class User(Base, SurrogatePK):
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    disabled = Column(Boolean, default=False)
    account_created = Column(DateTime, default=None)
