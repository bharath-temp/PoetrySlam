from uuid import uuid4
import datetime

import stringcase
import sqlalchemy as sa
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy_utils import UUIDType


class AuditMixin(object):
    created_at = sa.Column(sa.DateTime, default=datetime.datetime.utcnow,
                           nullable=False)
    updated_at = sa.Column(sa.DateTime, default=datetime.datetime.utcnow,
                           onupdate=datetime.datetime.utcnow, nullable=False)


class SurrogatePK(object):
    @declared_attr
    def __tablename__(cls):
        return stringcase.snakecase(cls.__name__)

    id = sa.Column(UUIDType(binary=False), primary_key=True, index=True,
                   default=uuid4)
