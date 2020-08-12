import datetime

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy_utils import UUIDType
from sqlalchemy.orm import relationship

from PoetrySlam.mixins import SurrogatePK, AuditMixin

Base = declarative_base()


class User(Base, SurrogatePK, AuditMixin):
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    disabled = Column(Boolean, default=False)
