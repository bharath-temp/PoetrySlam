import datetime
import enum

import sqlalchemy as sa
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, \
                       DateTime, Enum
from sqlalchemy_utils import UUIDType
from sqlalchemy.orm import relationship

from PoetrySlam.mixins import SurrogatePK, AuditMixin

Base = declarative_base()


class PoemType(enum.Enum):
    FREE_VERSE = 'free_verse'
    RHYMED = 'rhymed'
    EPIC = 'epic'
    NARRATIVE = 'narrative'
    HAIKU = 'haiku'
    SONNET = 'sonnet'
    ELEGIE = 'elegie'
    ODE = 'ode'
    LIMERICK = 'limeric'
    LYRIC = 'lyric'
    BALLAD = 'ballad'
    SOLILOQUY = 'soliloquy'
    VILLANELLE = 'villanelle'


class User(Base, SurrogatePK, AuditMixin):
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    disabled = Column(Boolean, default=False)
    poems = relationship("Poem", back_populates="author")


class Poem(Base, SurrogatePK, AuditMixin):
    title = Column(String, index=True)
    text = Column(String, index=True)
    upvotes = Column(Integer, index=True)
    downvotes = Column(Integer, index=True)
    author_id = Column(UUIDType(), ForeignKey("user.id"))
    poem_type = Column(sa.Enum(PoemType, native_enum=False),
                       default=PoemType.FREE_VERSE, nullable=False)
    author = relationship("User", back_populates="poems")
